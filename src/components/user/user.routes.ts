import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', () => {
	console.log('Get the user route');
});

export default userRouter;
