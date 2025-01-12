import dotenv from 'dotenv';
import supabaseClient from "./postgresql.service";

const client = require('twilio')(process.env.ACCOUNTSID, process.env.TWILIO_AUTH_TOKEN);
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
                .select('id, name, email, phoneNumber, address , birthday')
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
                .select('favouriteList')
                .eq('id', id);
            if (error) throw error;

            const favouriteList = data[0].favouriteList;

            // Fetch details for all product IDs in favouriteList
            const response = await Promise.all(
                favouriteList.map(async (productId: string) => {
                    const { data, error } = await this.instance
                        .from('products')
                        .select('*')
                        .eq('id', productId)
                        .single(); // Use .single() if each productId is unique and returns only one row
                    if (error) throw error;
                    return data;
                })
            );

            return response;
        } catch (error) {
            throw error;
        }
    }
    async addFavorite(id: string, productId: string) {
        try {
            // Fetch the current favouriteList of the user
            const { data: userData, error: fetchError } = await this.instance
                .from(this.table)
                .select('favouriteList')
                .eq('id', id)
                .single(); // Use .single() to get only one result

            if (fetchError) {
                throw fetchError;
            }

            // Append the new productId to the current favouriteList
            const updatedFavouriteList = [...userData.favouriteList, productId];

            // Update the user's favouriteList with the new list
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    favouriteList: updatedFavouriteList
                })
                .eq('id', id);

            if (error) {
                throw error;
            }
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

    async getDeliveryAddress(id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .select('address')
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async addDeliveryAddress(id: string, address: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update({ delivery_address: address })
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async deleteDeliveryAddress(id: string) {
        try {
            const { data, error } = await this.instance
                .from(this.table)
                .update({ delivery_address: null })
                .eq('id', id);
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async removeFavorite(id: string, productId: string) {
        try {
            // Fetch the current favouriteList of the user
            const { data: userData, error: fetchError } = await this.instance
                .from(this.table)
                .select('favouriteList')
                .eq('id', id)
                .single(); // Use .single() to get only one result

            if (fetchError) {
                throw fetchError;
            }

            // Remove the productId from the favouriteList using array_remove
            const updatedFavouriteList = userData.favouriteList.filter(item => item !== productId);

            // Update the user's favouriteList with the new list
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    favouriteList: updatedFavouriteList
                })
                .eq('id', id);

            if (error) {
                throw error;
            }
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
            client.verify.v2.services("VA08fa634a5bf592ed88c9dc2f169756e1")
                .verifications
                .create({ to: '+16465386464', channel: 'sms' })
                .then(verification => console.log(verification.sid));

            return { message: 'OTP sent' };
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