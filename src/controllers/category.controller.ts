import { Request, Response } from 'express';
import { categoryService } from '../services';

class categoryController {
    async getAllCategories(req:Request, res:Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({message: 'Error getting products'});
        }
    }
}

export default new categoryController();