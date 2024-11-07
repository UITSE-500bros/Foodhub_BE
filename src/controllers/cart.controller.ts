import { Request, Response } from 'express';
import { cartService } from '../services';

class cartController {
    async getCartByUserID(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const cart = await cartService.getCartByUserID(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error getting cart' });
        }
    }
    async createCartByUserID(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const cart = await cartService.createCartByUserID(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error creating cart' });
        }
    }
}
export default new cartController();