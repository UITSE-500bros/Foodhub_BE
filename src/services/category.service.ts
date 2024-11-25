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

    async getCategoryByName(categoryName: string) {
        try {
            const categoriesCollection = await mongoService.getCollection('Categories');
            return await categoriesCollection.findOne({ categoryName });
        } catch (error) {
            console.error('Error getting category by name:', error);
            throw error;
        }
    }

    async createCategory(category: Category) {
        try {
            const categoriesCollection = await mongoService.getCollection('Categories');
            const result = await categoriesCollection.insertOne(category);
    
            // Create a new category object to return with the insertedId
            return {
                ...category,  // Include all fields of the original category
                _id: result.insertedId.toString()  // Add the Mongo-generated _id as a string
            };
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;  // Ensure error is thrown for proper handling elsewhere
        }
    }
}
const categoryService = new CategoryService();
export default categoryService;