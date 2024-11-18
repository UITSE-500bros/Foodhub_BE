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
    try{
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      return await productsCollection.findOne({productId: id});
    } catch (error) {
        console.error('Error getting product by id:', error);
        throw error;
    }
  }
  async getProductByCategory(id: string) {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      return await productsCollection.find({product_type: id}).toArray();
    } catch (error) {
        console.error('Error getting products:', error);
        throw error;
    }
  }
}
export default new ProductService();