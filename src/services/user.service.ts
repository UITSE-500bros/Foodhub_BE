import supabaseClient from "./postgresql.service";
import dotenv from 'dotenv'
dotenv.config();
class UserService {
    private instance: any;
    private table = 'users';
    constructor() {
        this.instance = supabaseClient.getInstance();
    }

    async getUserProfile(id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateUserProfile(id: string, user: any) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update(user)
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getFavorites(id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .select('*')
                .eq('userId', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async addFavorite(id: string, productId: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .insert([{ userId: id, productId: productId }]);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async loginWithProvider(provider: string) {
        try {
            const { data, error } = await this.instance.auth.signInWithOAuth({
                provider: provider, // Change provider to Google
                options: {
                    redirectTo: process.env.REDIRECT_URL, // The URL to redirect to after login
                    skipBrowserRedirect: true,
                    queryParams: {
                        prompt: "select_account", // Forces Google to show the account picker
                        response_type: 'code', // Tells Google to return an authorization code
                    },
                },
            });
            if (error) throw error;

            return data;
        } catch (error) {
            throw error;
        }
    }
    async setSession(access_token: string, refresh_token: string) {
        const { data, error } = await this.instance.auth.setSession({
            access_token,
            refresh_token,
        });
        if (error) throw error;
        return data.session;
    }

    async getDeliveryAddress(user_id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .select('delivery_address')
                .eq('user_id', user_id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async addDeliveryAddress(user_id: string, address: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update({ delivery_address: address })
                .eq('user_id', user_id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async deleteDeliveryAddress(user_id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update({ delivery_address: null })
                .eq('user_id', user_id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async 
}
const userService = new UserService();
export default userService;