import { ObjectId } from 'mongodb';
import mongoService from './mongo.service';
import { Product } from 'src/models';
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

  async getProductType() {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      const result = await productsCollection.aggregate([
        { $group: { _id: "$product_type" } }  // Group by 'product_type' to get distinct values
      ]).toArray();

      // Map the result to extract the 'product_type' values
      return result.map(item => item._id);
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      return await productsCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error getting product by id:', error);
      throw error;
    }
  }
  async getProductByCategory(id: string) {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      const result = await productsCollection.find({ productType: new ObjectId(id) }).toArray();
      return result;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }
  async updateProduct(id: string, product: Product) {
    try {
      const productsCollection = await mongoService.getCollection('Products'); // Ensure 'products' is the correct collection name
      return await productsCollection.updateOne({ productId: id }, { $set: product });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  async updateCategory(newCategoryName: string, categoryId: string): Promise<void> {
    try {
      const productsCollection = await mongoService.getCollection('Products');

      const result = await productsCollection.updateMany(
        { productType: new ObjectId(categoryId) }, // Ensure categoryId is treated as ObjectId
        { $set: { productType: new ObjectId(newCategoryName) } }
      );

      if (result.matchedCount === 0) {
        console.error('No category found with the specified ID');
        throw new Error('Category not found');
      }

      console.log('Category updated successfully');
    } catch (error) {
      console.error('Error updating category:', error);
      throw error; // Ensure error is thrown for proper handling elsewhere
    }
  }


}
const productService = new ProductService();
export default productService;