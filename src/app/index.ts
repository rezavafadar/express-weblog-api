import express from 'express';

import { NODE_ENV, PORT } from '../config/index';
import v1Router from './v1.router';
import { globalErrorHandler } from '../middlewares/globalErrorHandler';

class Application {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('/api/v1', v1Router);

    this.app.use(globalErrorHandler);
  }

  public run(port?: number | string, callback?: () => void) {
    const APPPORT = port || PORT;

    if (callback) return this.app.listen(APPPORT, callback);

    this.app.listen(APPPORT, () => {
      console.log(`Server is running on port ${APPPORT} and ${NODE_ENV} mode`);
    });
  }
}

export default Application;
