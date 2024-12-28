import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";
const userRouter = Router();

userRouter.get("/favorites", userController.getFavorites);
userRouter.post("/favorites",authMiddleware, userController.addFavorite);
userRouter.patch("/profile",authMiddleware, userController.updateProfile);
userRouter.get("/google", userController.loginGoogle);
userRouter.get("/handlecallback", userController.redirectCallback);
userRouter.post("/refreshToken", userController.retrieveSession)


export default userRouter;