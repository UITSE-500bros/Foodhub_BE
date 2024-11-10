import { Router } from "express";
import { orderController } from "~/controllers";

const orderRouter = Router();

orderRouter.post('/create', orderController.createOrder);
orderRouter.get('/:orderId', orderController.getOrderDetail);
orderRouter.get('/track/:orderId', orderController.trackOrder);
orderRouter.delete('/:orderId', orderController.cancelOrder);
orderRouter.put('/:orderId', orderController.updateOrder);
orderRouter.get('/user/:userId', orderController.getOrdersByUserID);

export default orderRouter;