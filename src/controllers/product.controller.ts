import { Request, Response } from 'express';
import {productService} from '../services';

class ProductController {
    async getProducts(req:Request, res:Response) {
        try{
            const result = await productService.getProducts();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting products', error);
            res.status(500).json({message: 'Error getting products'});
        }
    }
    async getProductById(req:Request, res:Response) {
        try{
            const result = await productService.getProductById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by id', error);
            res.status(500).json({message: 'Error getting product by id'});
        }
    }
    async getProductByCategory(req:Request, res:Response) {
        try{
            const result = await productService.getProductByCategory(req.params.category);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by category', error);
            res.status(500).json({message: 'Error getting product by category'});
        }
    }
}
const productController = new ProductController();
export default productController;