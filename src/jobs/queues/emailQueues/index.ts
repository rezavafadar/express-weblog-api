// queues
import UserWlcEmailQueue from './user-wlc-email';
import UserVerifyEmailQueue from './user-verify-email';

import { EMAIL_CONFIG } from '../../../config';
import EmailSender from '../../../services/email.service';

const emailSender = new EmailSender(EMAIL_CONFIG);

const userWlcEmailQueue = new UserWlcEmailQueue(emailSender);
const userVerifyEmailQueue = new UserVerifyEmailQueue(emailSender);

export default [userVerifyEmailQueue, userWlcEmailQueue];
