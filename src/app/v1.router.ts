import authController from '../components/auth/auth.module';
import { createAppRouter } from '../decorators/routing.decorator';

const v1Router = createAppRouter([authController]);

export default v1Router;
