import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/auth/google", userController.createUser);
userRouter.put("/:id", userController.updateInfo);
userRouter.get("/:id/favorites", userController.getFavorites);
userRouter.post("/:id/favorites/:productId", userController.addFavorite);


export default userRouter;