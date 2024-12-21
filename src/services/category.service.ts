import { Category } from "../models";
import supabaseClient from "./postgresql.service";

class CategoryService {
    async getAllCategories() {
        try {
            const { data, error } = await supabaseClient.getInstance().from('categories').select();
            if (error) {
                console.error('Error getting categories:', error);
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }

    async getCategoryByName(categoryName: string) {
        try {
            const { data, error } = await supabaseClient.getInstance().from('categories').select().eq('name', categoryName);
            if (error) {
                console.error('Error getting category by name:', error);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error getting category by name:', error);
            throw error;
        }
    }

    

    async createCategory(category: Category) {
        try {
            const { data, error } = await supabaseClient.getInstance().from('categories').insert(category);
            if (error) {
                console.error('Error creating category:', error);
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;  // Ensure error is thrown for proper handling elsewhere
        }
    }
}
const categoryService = new CategoryService();
export default categoryService;