import supabaseClient from './postgresql.service';
class BucketService {
    private instance: any;
    constructor() {
        this.instance = supabaseClient.getInstance();
    }

    async getBucketBanner() {
        try {
            const { data, error } = await this.instance
                .from('bannersLink')
                .select('image_link')
            if (error) {
                throw error;
            }
            return data;

        } catch (error) {
            console.error('Error getting bucket banner:', error);
            throw error;
        }
    }
}
const bucketService = new BucketService();
export default bucketService;