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
    async getProductDetailById(req:Request, res:Response) {
        try{
            const {product_id} = req.query;
            if (typeof product_id !== 'string') {
                throw new Error('Invalid category id');
            }
            const result = await productService.getProductById(product_id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by id', error);
            res.status(500).json({message: 'Error getting product by id'});
        }
    }
    async getProductByCategory(req:Request, res:Response) {
        try{
            const {category_id} = req.query;
            if (typeof category_id !== 'string') {
                throw new Error('Invalid category id');
            }
            const result = await productService.getProductByCategory(category_id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by category', error);
            res.status(500).json({message: 'Error getting product by category'});
        }
    }
    async updateProductType(req:Request, res:Response) {
        try{
            const { idnew, idold } = req.body;
            const result = await productService.updateCategory(idnew, idold);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating product', error);
            res.status(500).json({message: 'Error updating product'});
        }
    }
}
const productController = new ProductController();
export default productController;