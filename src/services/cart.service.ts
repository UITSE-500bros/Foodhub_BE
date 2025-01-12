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
    async addProductToCart(id: string, productId: string, quantity: number) {
        try {
            // Fetch the current cart of the user
            const { data: userData, error: fetchError } = await this.instance
                .from(this.table)
                .select('cart')
                .eq('id', id)
                .single(); // Use .single() to get only one result

            if (fetchError) {
                throw fetchError;
            }

            // Append the new product (with productId and quantity) to the current cart
            const updatedCartList = [...userData.cart, { productId, quantity }];

            // Update the user's cart with the new list
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    cart: updatedCartList  // Update the cart field
                })
                .eq('id', id);

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error; // Propagate the error
        }
    }

    async deleteProductFromCart(id: string, productId: string) {
        try {
            // Fetch the current cart of the user
            const { data: userData, error: fetchError } = await this.instance
                .from(this.table)
                .select('cart')
                .eq('id', id)
                .single(); // Use .single() to get only one result

            if (fetchError) {
                throw fetchError;
            }

            // Remove the productId from the cart using filter
            const updatedCartList = userData.cart.filter(item => item.productId !== productId);

            // Update the user's cart with the new list
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    cart: updatedCartList
                })
                .eq('id', id);

            if (error) {
                console.error('Error deleting product from cart:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            throw error;
        }
    }

    async updateProductQuantity(userId: string, productId: string, quantity: number) {
        try {
            // Fetch the current cart of the user
            const { data: userData, error: fetchError } = await this.instance
                .from(this.table)
                .select('cart')
                .eq('id', userId)
                .single(); // Use .single() to get only one result

            if (fetchError) {
                throw fetchError;
            }

            // Update the quantity of the specified productId in the cart
            const updatedCartList = userData.cart.map(item =>
                item.productId === productId
                    ? { ...item, quantity } // Update the quantity if the productId matches
                    : item
            );

            // Update the user's cart with the new list
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    cart: updatedCartList // Update the cart field
                })
                .eq('id', userId);

            if (error) {
                console.error('Error updating product quantity:', error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error updating product quantity:', error);
            throw error;
        }
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