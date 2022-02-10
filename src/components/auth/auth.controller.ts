import { AuthService } from './auth.service';
import { Request, Response } from 'express';

export class AuthController {
	constructor(private readonly authService:AuthService){}


	register(req: Request, res: Response) {
		res.json({ ok: true });
	}
}
