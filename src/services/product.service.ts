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
        .select('id,product_detail,created_at, updated_at, product_name, product_price,category_id, is_sale, percentage_sale, product_image, brand, quantity')
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
        .from(this.table)
        .select('id, created_at, updated_at, product_name, product_price,category_id, is_sale, percentage_sale, product_image, brand, quantity')
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

  async getNewArrivals() {
    try {
      const { data } = await this.instance
        .from('random_products')
        .select('id, created_at, updated_at, product_name, product_price,category_id, is_sale, percentage_sale, product_image, brand, quantity')
        .limit(6);

      return data;
    } catch (error) {

    }
  }

  async getExclusive() {
    try {
      const { data, error } = await this.instance
        .from('random_products')
        .select('id, created_at, updated_at, product_name, product_price,category_id, is_sale, percentage_sale, product_image, brand, quantity')
        .eq('is_sale', false)
        .limit(6);
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
  async getBestSellers() {
    try {
      const { data, error } = await this.instance
        .from('random_product')
        .select('id, created_at, updated_at, product_name, product_price, is_sale, percentage_sale, product_image, brand, quantity')
        .order('quantity', { ascending: false })
        .limit(6);
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
  async searchProduct(search: string) {
    console.log('search', search);
    const { data, error } = await this.instance
      .from(this.table)
      .select()
      .textSearch('product_name_english', `${search}`, {
        type: 'plain',        // Optional: You can also use 'phrase' or 'websearch'
      });

    console.log('data', data);
    if (error) {
      console.error('Error:', error);
    }

    return data;

  }

}
const productService = new ProductService();
export default productService;