import { Router } from "express";
import { cartController } from "../controllers";


const cartRouter = Router();
cartRouter.get("/:userId", cartController.getCartByUserID);

export default cartRouter;