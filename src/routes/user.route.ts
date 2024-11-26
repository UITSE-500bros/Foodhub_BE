import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/auth/google", userController.createUser);

export default userRouter;