import { Job } from 'bull';
import { IEmailService } from '../../../interfaces/services.interfaces';
import { IQueue } from '../../../interfaces/queues.interfaces';
import queuesNames from '../constant';

class UserWlcEmailQueue implements IQueue {
  public name: string;
  public readonly emailSender: IEmailService;
  constructor(emailSender: IEmailService) {
    this.name = queuesNames.userWlcEmail;
    this.emailSender = emailSender;
  }

  async handler(job: Job) {
    await this.emailSender.sendMail({
      to: job.data.email,
      subject: 'Welcome To Virgool.vr',
      text: 'Hi Friend! Welcom to our weblog!',
    });
  }
}

export default UserWlcEmailQueue;
