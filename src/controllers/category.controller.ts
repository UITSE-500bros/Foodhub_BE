import { Request, Response } from 'express';
import { Category } from '../models';
import { categoryService } from '../services';

class categoryController {
    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error getting products' });
        }
    }
    async createCategory(req: Request, res: Response) {
        try {

            const { categoryName } = req.body;

            if (!categoryName) {
                return res.status(400).json({ message: 'Category name is required' });
            }
            if (await categoryService.getCategoryByName(categoryName)) {
                return res.status(400).json({ message: 'Category name already exists' });
            }

            const date = new Date();
            const newCategory = new Category(categoryName, null, date, date);
            await categoryService.createCategory(newCategory);
            return res.status(200).json({ message: 'Category created successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error creating category' });
        }
    }

}

export default new categoryController();