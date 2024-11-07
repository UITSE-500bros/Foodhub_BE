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
}
export default new CategoryService();