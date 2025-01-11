import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";
const userRouter = Router();

userRouter.get("/google", userController.loginGoogle);
userRouter.get("/facebook", userController.loginFacebook);
userRouter.get("/handlecallback", userController.redirectCallback);
userRouter.post("/refreshToken", userController.retrieveSession);
userRouter.get("/favorites", authMiddleware,userController.getFavorites);
userRouter.post("/phone",userController.verifyPhoneNumber);
userRouter.get("/otp", authMiddleware, userController.verifyOTP);
userRouter.post("/favorites",authMiddleware, userController.addFavorite);
userRouter.delete("/favorites",authMiddleware, userController.removeFavorite);
userRouter.delete("/favorites/all",authMiddleware, userController.removeAllFromFavorites);
userRouter.patch("/profile",authMiddleware, userController.updateProfile);

export default userRouter;