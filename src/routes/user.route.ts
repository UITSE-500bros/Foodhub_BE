import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";

const userRouter = Router();

userRouter.get("/favorites", userController.getFavorites);
userRouter.post("/favorites",authMiddleware, userController.addFavorite);
userRouter.patch("/profile",authMiddleware, userController.updateProfile);
userRouter.post("/payment", userController.createPaymentUrl);
userRouter.get("/payment/callback", userController.getReturn);
userRouter.get("/google", userController.loginGoogle);
userRouter.get("/callback", userController.redirectCallback);
export default userRouter;