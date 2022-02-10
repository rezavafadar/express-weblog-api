import authController from "./auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", () => {
  console.log("Get the auth route");
});

authRouter.post("/register", authController.register);

export default authRouter;
