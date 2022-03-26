import { EmailConfig } from '../interfaces/email.interfaces';

export const {
  NODE_ENV,
  PORT,
  EMAIL_PASS,
  EMAIL_USER,
  EMAIL_PORT,
  EMAIL_HOST,
  JWT_SECRET,
  REDIS_URL,
} = process.env;

export const EMAIL_CONFIG: EmailConfig = {
  host: EMAIL_HOST,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  port: +EMAIL_PORT,
};

export const SOURCE_PATH = 'src';
export const MAIN_FILES_PATH = 'public';
export const PROFILES_IMGS_PATH = 'usersProfiles';
