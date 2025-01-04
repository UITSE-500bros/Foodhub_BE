import { Request, Response } from 'express';
import { productService } from '../services';
import { convertVietnameseToEnglish } from '../utils';

class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const result = await productService.getProducts();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting products', error);
            res.status(500).json({ message: 'Error getting products' });
        }
    }
    async getProductDetailById(req: Request, res: Response) {
        try {
            const { product_id } = req.query;
            if (typeof product_id !== 'string') {
                throw new Error('Invalid category id');
            }
            const result = await productService.getProductById(product_id);
            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by id', error);
            res.status(500).json({ message: 'Error getting product by id' });
        }
    }
    async getProductByCategory(req: Request, res: Response) {
        try {
            const { category_id } = req.query;
            if (typeof category_id !== 'string') {
                throw new Error('Invalid category id');
            }
            const result = await productService.getProductByCategory(category_id);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting product by category', error);
            res.status(500).json({ message: 'Error getting product by category' });
        }
    }

    async getNewArrivals(req: Request, res: Response) {
        try {
            const result = await productService.getNewArrivals();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting new arrivals', error);
            res.status(500).json({ message: 'Error getting new arrivals' });
        }
    }
    async getBestSeller(req: Request, res: Response) {
        try {
            const result = await productService.getBestSellers();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting best seller', error);
            res.status(500).json({ message: 'Error getting best seller' });
        }
    }
    async getExclusive(req: Request, res: Response) {
        try {
            const result = await productService.getExclusive();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error getting exclusive', error);
            res.status(500).json({ message: 'Error getting exclusive' });
        }
    }

    async searchProduct(req: Request, res: Response) {
        try {
            const { search } = req.query;
            if (typeof search !== 'string') {
                throw new Error('Invalid search query');
            }
            // Convert Vietnamese text to plain English text
            const normalizedSearch = convertVietnameseToEnglish(search);

            const result = await productService.searchProduct(normalizedSearch);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error searching product', error);
            res.status(500).json({ message: 'Error searching product' });
        }
    }

}
const productController = new ProductController();
export default productController;