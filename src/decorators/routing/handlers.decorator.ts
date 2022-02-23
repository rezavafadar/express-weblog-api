import { MetaDataKeys } from './metadata.keys';

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IRoutes {
  method: Methods;
  handlerName: string;
  path: string;
}

function methodFactory(method: Methods) {
  return (path: string) => {
    return (target: any, key: string) => {
      const classConstructor = target.constructor;
      let routes: IRoutes[] =
        Reflect.getMetadata(MetaDataKeys.ROUTERS, classConstructor) || [];

      routes.push({
        method,
        handlerName: key,
        path,
      });

      Reflect.defineMetadata(MetaDataKeys.ROUTERS, routes, classConstructor);
    };
  };
}

export const Get = methodFactory(Methods.GET);
export const Post = methodFactory(Methods.POST);
export const Delete = methodFactory(Methods.DELETE);
export const Put = methodFactory(Methods.PUT);
