import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', () => {
	console.log('Get the auth route');
});

export default authRouter;
