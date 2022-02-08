import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/user', userRoutes);

export default apiRouter;
