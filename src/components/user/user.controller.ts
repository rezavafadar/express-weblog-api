import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController{
    constructor(private readonly userService:UserService){}

    getMe(req:Request,res:Response){}
}