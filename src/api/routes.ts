import { Router } from 'express';
import userRoutes from '../components/user/user.routes';
import authRoutes from '../components/auth/auth.routes';

const apiRouter = Router()

apiRouter.use('/auth',authRoutes)
apiRouter.use('/user',userRoutes)

export default apiRouter