import authController from '../components/auth/auth.module';
import userController from '../components/user/user.module';
import { createAppRouter } from '../decorators/routing.decorator';

const v1Router = createAppRouter([authController, userController]);

export default v1Router;
