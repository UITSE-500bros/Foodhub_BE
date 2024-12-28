import { Router } from "express";
import { orderController } from "../controllers";

const orderRouter = Router();

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrderDetail);
orderRouter.put("/:id", orderController.updateAnOrder);
orderRouter.delete("/:id", orderController.cancelAnOrder);

orderRouter.post("/createPaymentIntent", orderController.createPaymentUrl);
orderRouter.post("/paymentCallback", orderController.getReturn);

export default orderRouter;