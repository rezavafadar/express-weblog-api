import type { Handler, NextFunction, Request, Response, Router } from 'express';
import { User } from './user.interfaces';

export interface RoutesOptions {
  path: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  handler: (req: Request, res: Response, next: NextFunction) => void;
  localMiddleware?: Handler[];
}

export abstract class Controller {
  public readonly path: string;
  protected routes: RoutesOptions[];
  protected router: Router;

  setRoutes(): Router {
    this.routes.map((route) => {
      if (route.localMiddleware) {
        route.localMiddleware.map((mid) => {
          this.router.use(route.path, mid);
        });
      }

      switch (route.method) {
        case 'POST':
          this.router.post(route.path);
          break;
        case 'GET':
          this.router.get(route.path, route.handler);
          break;
        case 'DELETE':
          this.router.delete(route.path, route.handler);
          break;
        case 'PUT':
          this.router.put(route.path, route.handler);
          break;
      }
    });

    return this.router;
  }
}

export interface UserInRequest extends Request {
  user: User;
}
