import 'reflect-metadata';
import { Router } from 'express';
import { IRoutes } from './handlers.decorator';
import { MetaDataKeys } from './metadata.keys';
import wrapper from '../../utils/wrapper';

function Controller(path: string) {
  return (target: any) => {
    Reflect.defineMetadata(MetaDataKeys.IS_CONTROLLER, true, target.prototype);
    const routes: IRoutes[] = Reflect.getMetadata(MetaDataKeys.ROUTERS, target);

    target.prototype.getRouter = function () {
      const router = Router();

      routes.forEach((route) => {
        router[route.method](
          route.path,
          wrapper(target.prototype[route.handlerName]),
        ).bind(target);
      });

      return Router().use(path, router);
    };
  };
}

export function getRoutes(instance: any) {
  if (Reflect.getMetadata(MetaDataKeys.IS_CONTROLLER, instance))
    return instance.getRouter();
  throw new Error("is's not controller");
}
export default Controller;
