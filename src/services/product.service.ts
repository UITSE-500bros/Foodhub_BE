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
  async updateProductType() {
    try {
        const productsCollection = await mongoService.getCollection('Products');
        const categoriesCollection = await mongoService.getCollection('Categories');

        // Fetch all categories to match with products
        const categories = await categoriesCollection.find({}).toArray();
        
        // Iterate over each category
        for (const category of categories) {
            // Find products that match the categoryName
            const matchingProducts = await productsCollection.find({ product_type: category.categoryName }).toArray();

            // For each matching product, update its product_type to match the category's name
            for (const product of matchingProducts) {
                await productsCollection.updateOne(
                    { _id: product._id }, // Find the product by its _id
                    {
                        $unset: { product_type: "" }, // Remove the existing product_type if needed
                        $set: { productType: category._id } // Set the product_type to the category's name
                    }
                );
                console.log(`Updated product with _id: ${product._id} to category: ${category.categoryName}`);
            }
        }

        return { message: 'Product types updated successfully' };
    } catch (error) {
        console.error('Error updating product types:', error);
        throw error;
    }
}


}
const productService = new ProductService();
export default productService;