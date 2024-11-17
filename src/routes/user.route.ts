import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.getUserByEmailPassword);
// userRouter.get('/:userId', userController.getUserDetail);
// userRouter.put('/:userId', userController.updateUser);
// userRouter.delete('/:userId', userController.deleteUser);


export default userRouter;