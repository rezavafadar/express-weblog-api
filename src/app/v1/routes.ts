import { Router } from 'express';
import { getRoutes } from '../../decorators/routing/controller.decorator';
import authRoutes from '../../components/auth/auth.module';

const apiRouter = Router();

apiRouter.use('/auth', getRoutes(authRoutes));

export default apiRouter;
