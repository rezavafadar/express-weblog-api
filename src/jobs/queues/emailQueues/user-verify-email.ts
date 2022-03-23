import { Job } from 'bull';
import { IEmailService } from '../../../interfaces/services.interfaces';
import { IQueue } from '../../../interfaces/queues.interfaces';
import queuesNames from '../constant';

class UserVerifyEmailQueue implements IQueue {
  public name: string;
  public readonly emailSender: IEmailService;
  constructor(emailSender: IEmailService) {
    this.name = queuesNames.userVerifyEmail;
    this.emailSender = emailSender;
  }

  async handler(job: Job) {
    await this.emailSender.sendMail({
      to: job.data.email,
      subject: 'Verify To Virgool.vr',
      text: `Hi Friend! This code is for verify your account: ${job.data.code}`,
    });
  }
}

export default UserVerifyEmailQueue;
