import { Category } from "../models";
import mongoService from "./mongo.service";

class CategoryService {
    async getAllCategories() {
        try{
            const categoriesCollection = await mongoService.getCollection('Categories');
            return await categoriesCollection.find({}).toArray();
        }
        catch(error){
            console.error('Error getting categories:', error);
            throw error;
        }
    }
    async createCategory(category: Category) {
        try{
            const categoriesCollection = await mongoService.getCollection('Categories');
            const result = await categoriesCollection.insertOne(category);
            return result.ops[0];
        }
        catch(error){
            console.error('Error creating category:', error);
            throw error;
        }
    }
}
export default new CategoryService();