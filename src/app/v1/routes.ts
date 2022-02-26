import { Router } from 'express';
import { getRouter } from '../../decorators/routing.decorator';
import authRoutes from '../../components/auth/auth.module';

const apiRouter = Router();

apiRouter.use(getRouter(authRoutes));

export default apiRouter;
