import express, { Express } from "express";

import { NODE_ENV, PORT } from "./config/index";
import apiV1Routes from "./routes/api";

class Application {
  app: Express;

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
    this.app.use("/api/v1", apiV1Routes);
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
