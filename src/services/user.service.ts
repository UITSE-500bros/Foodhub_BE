import dotenv from 'dotenv';
import supabaseClient from "./postgresql.service";
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
                .select('id, favouriteList')
                .eq('id', id);
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
                .insert({
                    favouriteList: productId
                })
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async loginWithProvider(provider: string) {
        try {
            const { data, error } = await this.instance.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: process.env.REDIRECT_URL,
                    skipBrowserRedirect: true,
                    queryParams: {
                        prompt: "select_account",
                        response_type: 'code',
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
    async removeFavorite(id: string, productId: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .delete()
                .eq('id', id)
                .eq('favouriteList', productId);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async removeAllFromFavorites(id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update({ favouriteList: [] })
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async verifyPhoneNumber(phone: string) {
        try {

            const [sessionResult, otpResult] = await Promise.all([
                this.instance.auth.getSession(),
                this.instance.auth.setSession(),
                this.instance.auth.sendOtp({
                    phone: phone,
                    via: 'sms',
                }),
                
            ]);
            if (sessionResult.error) throw sessionResult.error;
            if (otpResult.error) throw otpResult.error;
            return { session: sessionResult.data, otp: otpResult.data };
        } catch (error) {
            throw error;
        }
    }
    async verifyOTP(phone: string, otp: string) {
        try {
            const {
                data,
                error,
              } = await this.instance.auth.verifyOtp({
                phone: phone,
                token: otp,
                type: 'sms',
              })
              
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

}
const userService = new UserService();
export default userService;