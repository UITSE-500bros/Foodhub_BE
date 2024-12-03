import { Router } from "express";
import { orderController } from "../controllers";

const orderRouter = Router();

orderRouter.get('/:orderId', orderController.getOrderDetail);
orderRouter.get('/track/:orderId', orderController.trackOrder);
orderRouter.post('/payment', orderController.createPaymentIntent);
orderRouter.put('/:orderId', orderController.updateOrder);
orderRouter.get('/user/:userId', orderController.getOrdersByUserID);
export default orderRouter;