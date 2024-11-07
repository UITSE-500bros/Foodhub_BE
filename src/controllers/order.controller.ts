import { Request, Response } from 'express';
import { orderService } from '../services';

class orderController{
    async createOrder(req: Request, res: Response){}
    async getOrderDetail(req: Request, res: Response){}
    async trackOrder(req: Request, res: Response){}
    async cancelOrder(req: Request, res: Response){}
    async updateOrder(req: Request, res: Response){}
    async getOrderByUserID(req: Request, res: Response){}
}

export default new orderController();