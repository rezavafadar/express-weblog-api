import 'reflect-metadata';
import { Handler, Router } from 'express';

import wrapper from '../exception/errorHandler';

enum MetaDataKeys {
  ROUTERS = 'routers',
  BASE_PATH = 'base_path',
  IS_CONTROLLER = 'iscontroller',
}

enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

interface IRoutes {
  method: Methods;
  path: string;
  middlewares: Handler[];
  handler: Handler;
}

export function Controller(path: string) {
  return (target: any) => {
    Reflect.defineMetadata(MetaDataKeys.IS_CONTROLLER, true, target.prototype);
    const routes: IRoutes[] = Reflect.getMetadata(MetaDataKeys.ROUTERS, target);

    target.prototype.getRouter = function () {
      const router = Router();

      routes.forEach((route) => {
        //use middlewares
        route.middlewares.forEach((handler) => {
          router.use(route.path, wrapper(handler));
        });

        router[route.method](route.path, wrapper(route.handler.bind(this)));
      });

      return Router().use(path, router);
    };
  };
}

export function getRouter(instance: any) {
  if (Reflect.getMetadata(MetaDataKeys.IS_CONTROLLER, instance))
    return instance.getRouter();
  throw new Error("is's not controller");
}

function methodFactory(method: Methods) {
  return (path: string, middlewares: Handler[] = []) => {
    return (target: any, key: string) => {
      const classConstructor = target.constructor;
      let routes: IRoutes[] =
        Reflect.getMetadata(MetaDataKeys.ROUTERS, classConstructor) || [];

      routes.push({
        method,
        path,
        middlewares: middlewares,
        handler: target[key],
      });

      Reflect.defineMetadata(MetaDataKeys.ROUTERS, routes, classConstructor);
    };
  };
}

export const Get = methodFactory(Methods.GET);
export const Post = methodFactory(Methods.POST);
export const Delete = methodFactory(Methods.DELETE);
export const Put = methodFactory(Methods.PUT);
