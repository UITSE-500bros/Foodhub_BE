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
            const result = await productService.getProductById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by id', error);
            res.status(500).json({message: 'Error getting product by id'});
        }
    }
    async getProductByCategory(req:Request, res:Response) {
        try{
            const {id} = req.params;
            console.log('id', id);
            const result = await productService.getProductByCategory(id);
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