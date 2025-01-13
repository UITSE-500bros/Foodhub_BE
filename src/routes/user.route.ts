import { Router } from "express";
import { userController } from "../controllers";
import { authMiddleware } from "../middlewares";
const userRouter = Router();

userRouter.get("/google", userController.loginGoogle);
userRouter.get("/facebook", userController.loginFacebook);
userRouter.post("/phone",userController.verifyPhoneNumber);
userRouter.get("/handlecallback", userController.redirectCallback);
userRouter.post("/getToken", userController.retrieveSession);
userRouter.post("/refreshToken", userController.refreshSession);

userRouter.get("/address", authMiddleware,userController.getDeliveryAddress);
userRouter.post("/address",authMiddleware,userController.addDeliveryAddress);
userRouter.delete("/address",authMiddleware, userController.deleteDeliveryAddress);
userRouter.get("/favorites",authMiddleware,userController.getFavorites);
userRouter.get("/otp", authMiddleware, userController.verifyOTP);
userRouter.post("/favorites",authMiddleware, userController.addFavorite);
userRouter.delete("/favorites",authMiddleware, userController.removeFavorite);
userRouter.delete("/favorites/all",authMiddleware, userController.removeAllFromFavorites);
userRouter.patch("/profile",authMiddleware, userController.updateProfile);
userRouter.get("/profile",authMiddleware, userController.getUserProfile);
export default userRouter;