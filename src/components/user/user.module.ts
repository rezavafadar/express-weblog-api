import UserController from './user.controller';
import UserService from './user.service';
import UserRepo from './user.repo';

const userController = new UserController(new UserService(new UserRepo()));

export default userController;
