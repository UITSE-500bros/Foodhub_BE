import { Request, Response } from 'express';
import { orderService } from '../services';


class orderController{
    
    async getOrderDetail(req: Request, res: Response){
        try{
            const { orderId } = req.params;
            const order = await orderService.getOrderDetailById(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(400).json({ message: 'Error getting order detail' });
        }
    }
    async trackOrder(req: Request, res: Response){
        try{
            const { orderId } = req.params;
            const order = await orderService.trackOrder(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(400).json({ message: 'Error tracking order' });
        }
    }
    
    async updateOrder(req: Request, res: Response){
        try{
            const { orderId } = req.params;

            const isUpdatable = await orderService.checkIsUpdatable(orderId);

            if(!isUpdatable){
                return res.status(400).json({ message: 'Your order is no longer updatable' });
            }
            
            const order = await orderService.updateOrder(orderId, req.body);
            return res.status(200).json(order);
        }catch(error){
            return res.status(400).json({ message: 'Error updating order' });
        }
    }
    async getOrdersByUserID(req: Request, res: Response){
        try{
            const { userId } = req.params;
            const orders = await orderService.getOrdersByUserId(userId);
            res.status(200).json(orders);
        }catch(error){
            res.status(400).json({ message: 'Error getting orders' });
        }
    }
}

export default new orderController();