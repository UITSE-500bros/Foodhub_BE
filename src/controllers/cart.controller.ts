import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/authorize';
import { cartService } from '../services';

class CartController {
    async getCartByUserID(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.customerId;
            let cart = await cartService.getCartByUserID(userId);
            if (!cart) {
                cart = await cartService.createCartByUserID(userId);
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error getting cart' });
        }
    }
    async addItemToCart(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.customerId;
            const {productId, quantity} = req.body;
            const cart = await cartService.addProductToCart(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error adding item to cart' });
        }
    }
    async updateItemInCart(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.customerId;
            const {productId, quantity} = req.body;
            const cart = await cartService.updateProductQuantity(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error updating item in cart' });
        }
    }
    async removeItemFromCart(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.customerId;
            const {productId} = req.body;
            const cart = await cartService.deleteProductFromCart(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Error removing item from cart' });
        }
    }

}
const cartController = new CartController();
export default cartController;