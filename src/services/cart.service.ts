import supabaseClient from './postgresql.service';

class CartService {
    private instance: any;
    private table = 'carts';
    constructor() {
        this.instance = supabaseClient.getInstance();
    }


    async getCartByUserID(userId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .select('*')
            .eq('user_id', userId);
        if (error) {
            console.error('Error getting cart:', error);
            throw error;
        }
        return data;
    }
    async addProductToCart(userId: string, productId: string, quantity: number) {
        const { data, error } = await this.instance
            .from(this.table)
            .insert([{ user_id: userId, product_id: productId, quantity: quantity }]);
        if (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
        return data;
    }
    async deleteProductFromCart(userId: string, productId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .delete()
            .eq('user_id', userId)
            .eq('product_id', productId);
        if (error) {
            console.error('Error deleting product from cart:', error);
            throw error;
        }
        return data;
    }
    async updateProductQuantity(userId: string, productId: string, quantity: number) {
        const { data, error } = await this.instance
            .from(this.table)
            .update({ quantity: quantity })
            .eq('user_id', userId)
            .eq('product_id', productId);
        if (error) {
            console.error('Error updating product quantity:', error);
            throw error;
        }
        return data;
    }
    async clearCart(userId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .delete()
            .eq('user_id', userId);
        if (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
        return data;
    }

    async createCartByUserID(userId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .insert([{ user_id: userId }]);
        if (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
        return data;
    }
    
}
const cartservice = new CartService();
export default cartservice;