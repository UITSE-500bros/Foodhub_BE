import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.get("/getinfo/:id", userController.getInfo);

export default userRouter;