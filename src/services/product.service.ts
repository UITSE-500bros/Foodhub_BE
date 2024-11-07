import mongoService from './mongo.service';

class ProductService {
  async getProducts() {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      return await productsCollection.find({}).toArray();
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
  }

  async getProductById(id: string) {
    
  }
}
export default new ProductService();