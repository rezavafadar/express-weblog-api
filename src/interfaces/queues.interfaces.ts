import { Job, Queue } from 'bull';
import { IEmailService } from './services.interfaces';

export interface IQueue {
  name: string;
  emailSender: IEmailService;
  handler(job: Job): void;
}

export interface ICreatedQueue {
  bull: Queue;
  handler: IQueue['handler'];
}
