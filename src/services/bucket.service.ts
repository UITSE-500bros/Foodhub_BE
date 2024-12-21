import supabaseClient from "./postgresql.service";
class BucketService {
    async getBucketBanner(bucketName: string) {
        try {
            //const {data} = await supabaseClient.storage.getBucket(bucketName);
            const { data, error } = await supabaseClient.getInstance()
                .storage
                .from('banners')
                .list('public', {
                    limit: 100,
                    offset: 0,
                })

            if (error) {
                console.error('Error getting bucket banner:', error);
                throw error;
            }
            // Generate public URLs for all files
            const publicUrls = data.map((file) => {
                const { data: publicUrlData } = supabaseClient.getInstance()
                    .storage
                    .from(bucketName)
                    .getPublicUrl(`public/${file.name}`);
                return {
                    fileName: file.name,
                    publicUrl: publicUrlData.publicUrl,
                };
            });
            return publicUrls;

        } catch (error) {
            console.error('Error getting bucket banner:', error);
            throw error;
        }
    }
}
const bucketService = new BucketService();
export default bucketService;