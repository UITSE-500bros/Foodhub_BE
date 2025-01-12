import { Router } from "express";
import { cartController } from "../controllers";
import { authMiddleware } from "../middlewares";


const cartRouter = Router();
cartRouter.post("/add", authMiddleware, cartController.addItemToCart);
cartRouter.get("/get", authMiddleware,cartController.getCartByUserID);
cartRouter.patch("/update", authMiddleware,cartController.updateItemInCart);
cartRouter.delete("/remove",authMiddleware, cartController.removeItemFromCart);

export default cartRouter;