import { Request, Response } from 'express';
import productService from '../services/product.service';

class productController {
    async getProducts(req:Request, res:Response) {
        try{
            const result = await productService.getProducts();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting products', error);
            res.status(500).json({message: 'Error getting products'});
        }
    }
}
export default new productController();