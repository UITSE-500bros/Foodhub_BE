import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.getUserByEmailPassword);



export default userRouter;