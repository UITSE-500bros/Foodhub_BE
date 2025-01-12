import { Router } from "express";
import { orderController } from "../controllers";
import { authMiddleware } from "../middlewares";

const orderRouter = Router();

orderRouter.get("/", authMiddleware,orderController.getOrders);
orderRouter.get("/:id", authMiddleware, orderController.getOrderDetail);
orderRouter.put("/:id", authMiddleware, orderController.updateAnOrder);
orderRouter.delete("/:id", authMiddleware, orderController.cancelAnOrder);
orderRouter.post("/createPaymentIntent", authMiddleware, orderController.createPaymentUrl);
orderRouter.post("/paymentCallback", authMiddleware, orderController.getReturn);
orderRouter.post("/cod", authMiddleware, orderController.shipCod);

export default orderRouter;