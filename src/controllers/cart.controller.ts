// import { Request, Response } from 'express';
// import { cartService } from '../services';

class CartController {
    // async getCartByUserID(req: Request, res: Response) {
    //     try {
    //         const userId = req.params.userId;

    //         let cart = await cartService.getCartByUserID(userId);
    //         if (!cart) {
    //             cart = await cartService.createCartByUserID(userId);
    //         }
    //         res.status(200).json(cart);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error getting cart' });
    //     }
    // }
    // async addItemToCart(req: Request, res: Response) {
    //     try {
    //         const userId = req.params.userId;
    //         const {productId, quantity} = req.body;
    //         const cart = await cartService.updateCartByUserID(userId, productId, quantity);
    //         res.status(200).json(cart);
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error adding item to cart' });
    //     }
    // }
}
const cartController = new CartController();
export default cartController;