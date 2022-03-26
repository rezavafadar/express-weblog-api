import path from 'path';

import {
  MAIN_FILES_PATH,
  PROFILES_IMGS_PATH,
  SOURCE_PATH,
} from './../../config/index';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepo from './user.repo';
import Uploader from '../../services/upload.service';

const userController = new UserController(
  new UserService(
    new UserRepo(),
    new Uploader(path.join(SOURCE_PATH, MAIN_FILES_PATH, PROFILES_IMGS_PATH)),
  ),
);

export default userController;
