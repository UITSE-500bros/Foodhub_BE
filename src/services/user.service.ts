import dotenv from 'dotenv';
import supabaseClient from "./postgresql.service";

const client = require('twilio')(process.env.ACCOUNTSID, process.env.TWILIO_AUTH_TOKEN);
dotenv.config();

interface UserProfile {
    avatar?: string;
    updated_at: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    birthday?: string;
}

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
                .select('id, name,avatar, email, phoneNumber, address , birthday')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateUserProfile(id: string, user: Partial<UserProfile>) {
        try {
            // Add `updated_at` explicitly
            user.updated_at = new Date().toISOString();
            const { data, error } = await this.instance
                .from(this.table)
                .update({
                    ...user,
                })
                .eq('id', id)
                .select('id, name,avatar, email, phoneNumber, address , birthday')


            if (error) {
                console.log(error);
                throw error; // Supabase error is thrown
            }
            console.log(data);
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
    async setSession(accessToken: string, refreshToken: string) {
        const { data, error } = await this.instance.auth.setSession({
            access_token: accessToken, refresh_token: refreshToken
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
            return data[0].address;
        } catch (error) {
            throw error;
        }
    }
    async addDeliveryAddress(id: string, address_name: string, address: string) {
        try {
            const { data: addressData, error: fetchError } = await this.instance
                .from(this.table)
                .select('address')
                .eq('id', id)
                .single(); // Use .single() to fetch one record.

            if (fetchError) throw fetchError;

            let updatedAddress = [];
            if (!addressData || !addressData.address) {
                updatedAddress = [{ address_name, address }];
            } else {
                updatedAddress = [...addressData.address, { address_name, address }];
            }

            const { data, error: updateError } = await this.instance
                .from(this.table)
                .update({ address: updatedAddress })
                .eq('id', id);

            if (updateError) throw updateError;
            return data;
        } catch (error) {
            throw error;
        }
    }
    async deleteDeliveryAddress(id: string, address_name: string) {
        try {
            const { data: addressData, error: fetchError } = await this.instance
                .from(this.table)
                .select('address')
                .eq('id', id)
                .single(); // Use .single() to retrieve a single row

            if (fetchError) throw fetchError;

            // Ensure addressData exists and extract the address field
            if (!addressData || !addressData.address) {
                throw new Error('Address not found for the given user ID');
            }
            console.log('addressData', addressData);
            const updatedAddress = addressData.address.filter(
                (item: { address: string, address_name: string }) => item.address_name !== address_name
            );

            // Update the database with the filtered address array
            const { data, error: updateError } = await this.instance
                .from(this.table)
                .update({ address: updatedAddress })
                .eq('id', id)
                .select('address');

            if (updateError) throw updateError;

            return data[0].address;
        } catch (error) {
            throw error;
        }
    }

    async updateDeliveryAddress(id: string, address_name: string, address: string) {
        try {
            const { data: addressData, error: fetchError } = await this.instance
                .from(this.table)
                .select('address')
                .eq('id', id)
                .single(); // Use .single() to retrieve a single row

            if (fetchError) throw fetchError;

            // Ensure addressData exists and extract the address field
            if (!addressData || !addressData.address) {
                throw new Error('Address not found for the given user ID');
            }

            // Find the index of the address to be updated
            const addressIndex = addressData.address.findIndex(
                (item: { address: string, address_name: string }) => item.address_name === address_name
            );

            // If the address is not found, throw an error
            if (addressIndex === -1) {
                throw new Error('Address not found for the given address name');
            }

            // Update the address with the new address
            addressData.address[addressIndex].address = address;

            // Update the database with the new address array
            const { data, error: updateError } = await this.instance
                .from(this.table)
                .update({ address: addressData.address })
                .eq('id', id)
                .select('address');

            if (updateError) throw updateError;

            return data[0].address;
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

    async refreshToken(refresh_token: string) {
        try {
            const { data, error } = await this.instance.auth.refreshSession({ refresh_token })
            if (error) throw error;
            return data;
        } catch (error) {
            throw error;
        }
    }

}
const userService = new UserService();
export default userService;