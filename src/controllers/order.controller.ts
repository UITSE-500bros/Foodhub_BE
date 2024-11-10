import { Request, Response } from 'express';
import { orderService } from '../services';
import { Order } from '~/models';
import { orderStatus } from '~/utils';

class orderController{
    async createOrder(req: Request, res: Response){
        try{
            const { userId,products,address, paymentMethod,totalPrice } = req.body;

            if(!userId || !products || !address || !paymentMethod){
                return res.status(400).json({ message: 'Missing required fields' });
            }

            if(products.length === 0){
                return res.status(400).json({ message: 'Products cannot be empty' });
            }

            const createAt = new Date();
            const updateAt = new Date();


            const newOrder = new Order(
                userId, 
                products, 
                totalPrice, 
                address, 
                orderStatus.pending,
                paymentMethod, 
                createAt, 
                updateAt);
            console.log(newOrder);
            const order = await orderService.createOrder(newOrder);
            res.status(201).json(order);
        }catch(error){
            res.status(400).json({ message: 'Error creating order' });
        }
    }
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
    async cancelOrder(req: Request, res: Response){
        try{
            const { orderId } = req.params;

            const isUpdatable = await orderService.checkIsUpdatable(orderId);

            if(!isUpdatable){
                return res.status(400).json({ message: 'Your order is no longer cancelled' });
            }

            const order = await orderService.deleteOrder(orderId);
            res.status(200).json(order);
        }catch(error){
            res.status(400).json({ message: 'Error deleting order' });
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
            res.status(200).json(order);
        }catch(error){
            res.status(400).json({ message: 'Error updating order' });
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