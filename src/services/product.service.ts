import supabaseClient from './postgresql.service';
import { Product } from '../models';

class ProductService {
  async getProducts() {
    try {
      const { data, error } = await supabaseClient.getInstance().from('products').select('id, created_at, updated_at, product_name, product_price, category_id, is_sale, percentage_sale, product_image, brand');
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async getProductType() {
    try {
      const { data, error } = await supabaseClient.getInstance().from('products').select('*');
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async getProductById(id: string) {
    try {
      const { data, error } = await supabaseClient.getInstance().from('products').select().eq('id', id);
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error getting product by id:', error);
      throw error;
    }
  }
  async getProductByCategory(categoryId: string) {
    try {
      console.log('categoryId', categoryId);
      const { data, error } = await supabaseClient.getInstance()
                    .from('products')
                    .select('id, created_at, updated_at, product_name, product_price, category_id, is_sale, percentage_sale, product_image, brand')
                    .eq('category_id', categoryId)
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }
  async updateProduct(id: string, product: Product) {
    try {
      const { data, error } = await supabaseClient.getInstance().from('products').select('*');
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  async updateCategory(newCategoryName: string, categoryId: string): Promise<void> {
    try {
      const { error } = await supabaseClient.getInstance().from('products').select('*');
      if (error) {
        console.error('Error getting categories:', error);
        throw error;
      }
      return;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error; // Ensure error is thrown for proper handling elsewhere
    }
  }


}
const productService = new ProductService();
export default productService;