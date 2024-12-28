import { Router } from "express";
import { cartController } from "../controllers";


const cartRouter = Router();
cartRouter.post("/add", cartController.addItemToCart);
cartRouter.get("/get", cartController.getCartByUserID);
cartRouter.patch("/update", cartController.updateItemInCart);
cartRouter.delete("/remove", cartController.removeItemFromCart);

export default cartRouter;