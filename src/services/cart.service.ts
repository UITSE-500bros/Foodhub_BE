import supabaseClient from './postgresql.service';

class CartService {
    private instance: any;
    private table = 'users';
    constructor() {
        this.instance = supabaseClient.getInstance();
    }


    async getCartByUserID(userId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .select('cart')
            .eq('id', userId);
        if (error) {
            console.error('Error getting cart:', error);
            throw error;
        }
        return data;
    }
    async addProductToCart(userId: string, productId: string, quantity: number) {
        const { data, error } = await this.instance
            .from(this.table)
            .update({
                "cart": this.instance.raw(`array_append("cart", ?)`, [{ productId, quantity }])
            })
        if (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
        return data;
    }
    async deleteProductFromCart(userId: string, productId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .update({
                "cart": this.instance.raw(`
                    array_remove(
                        "cart", 
                        (SELECT cart_item FROM jsonb_array_elements("cart") AS cart_item WHERE cart_item->>'productId' = ?)
                    )`, [productId])
            })
            .eq('id', userId);

        if (error) {
            console.error('Error deleting product from cart:', error);
            throw error;
        }
        return data;
    }
    async updateProductQuantity(userId: string, productId: string, quantity: number) {
        const { data, error } = await this.instance
            .from(this.table)
            .update({
                "cart": this.instance.raw(`
                    jsonb_set(
                        "cart",
                        '{${productId}}',
                        to_jsonb(?)::jsonb
                    )`, [quantity])
            })
            .eq('id', userId)
        if (error) {
            console.error('Error updating product quantity:', error);
            throw error;
        }
        return data;
    }
    async clearCart(userId: string) {
        const { data, error } = await this.instance
            .from(this.table)
            .update({ cart: [] })
            .eq('id', userId);
        if (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
        return data;
    }
}
const cartservice = new CartService();
export default cartservice;