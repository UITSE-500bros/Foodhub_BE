import { Request, Response } from 'express';
import { categoryService } from '../services';
import { ObjectId } from 'mongodb';

class categoryController {
    async getAllCategories(req:Request, res:Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({message: 'Error getting products'});
        }
    }
    async createCategory(req:Request, res:Response) {
        try {
            const {categoryName, categoryImage} = req.body;
            const date = new Date();
            const newCategory = {categoryId: new ObjectId(), categoryName, categoryImage, createdAt: date, updatedAt: date};
            const category = await categoryService.createCategory(newCategory);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({message: 'Error creating product'});
        }
    }
}

export default new categoryController();