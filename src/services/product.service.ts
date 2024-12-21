import supabaseClient from './postgresql.service';

class ProductService {
  private instance: any;
  private table = 'products';
  constructor() {
    this.instance = supabaseClient.getInstance();
  }

  async getProducts() {
    try {
      const { data, error } = await this.instance
        .from(this.table)
        .select('id, created_at, updated_at, product_name, product_price, category_id, is_sale, percentage_sale, product_image, brand, quantity');
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
      const { data, error } = await this.instance
        .from(this.table)
        .select('*');
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
      const { data, error } = await this.instance
        .from(this.table)
        .select('product_detail')
        .eq('id', id);
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
        .select('id, created_at, updated_at, product_name, product_price, is_sale, percentage_sale, product_image, brand, quantity')
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
  
}
const productService = new ProductService();
export default productService;