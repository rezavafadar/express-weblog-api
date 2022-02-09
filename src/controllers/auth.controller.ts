import { Request, Response } from 'express';

class AuthController {
	register(req: Request, res: Response) {
		res.json({ ok: true });
	}
}

export default new AuthController();
