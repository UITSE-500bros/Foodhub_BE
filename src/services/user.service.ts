import supabaseClient from "./postgresql.service";

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
}
const userService = new UserService();
export default userService;