import supabaseClient from './postgresql.service'
interface Review {
    id: string;
    product_id: string;
    customer:
    {
        id: string;
        name: string;
        avatar: string;
    };
    review_rate: number;
    review_text: string;
    created_at: string;
    updated_at: string;
    review_image: string;
}
class ReviewService {
    private instance = supabaseClient.getInstance();

    async createReview(product_id : string, review_rate : number, review_text : string,  customer_id : string) {
        const oldReview = await this.instance
            .from('reviews')
            .select('id')
            .eq('product_id', product_id)
            .eq('customer_id', customer_id);
        if (oldReview.data && oldReview.data.length > 0) {
            return "Review đã được tạo trước đó";
        }
        const { data, error } = await this.instance
            .from('reviews')
            .insert([{ product_id, review_rate, review_text, customer_id }])
            .select('id, product_id, customer_id, review_rate, review_text, created_at, updated_at');
            if (error) {
            console.log(error)
            throw error
        }
        return data[0];
    }

    async getReviewsByProductId(product_id: string) {
        const { data: reviewsData, error: reviewsError } = await this.instance
            .from('reviews')
            .select('id, product_id, customer_id, review_rate, review_text, created_at, updated_at, review_image')
            .eq('product_id', product_id);
    
        if (reviewsError) {
            throw new Error(`Error fetching reviews: ${reviewsError.message}`);
        }
    
        if (!reviewsData || reviewsData.length === 0) {
            return []; // No reviews found
        }
    
        // Extract unique customer IDs from reviews
        const customerIds = [...new Set(reviewsData.map((review: { customer_id: string }) => review.customer_id))];
    
        const { data: usersData, error: usersError } = await this.instance
            .from('users')
            .select('id, name, avatar')
            .in('id', customerIds);
    
        if (usersError) {
            throw new Error(`Error fetching user data: ${usersError.message}`);
        }
    
        // Map reviews with customer details
        const reviews = reviewsData.map((review: any) => {
            const customer = usersData?.find((user: any) => user.id === review.customer_id);
            return {
                ...review,
                customer: customer || null, // Handle missing user gracefully
            };
        });
    
        return reviews;
    }
    
    async getReviewsByCustomerId(userId: string) {
        const { data, error } = await this.instance
            .from('reviews')
            .select('*')
            .eq('customer_id', userId)
        if (error) {
            throw error
        }
        return data as Review[];
    }
    async updateReview(product_id : string, review_rate : number, review_text : string,customer_id: string, id: string) {
        const updated_at = new Date().toISOString();
        const { data, error } = await this.instance
            .from('reviews')
            .update({ product_id, review_rate, review_text,  updated_at })
            .eq('id', id)
            .eq('customer_id', customer_id)
            .select('id, product_id, customer_id, review_rate, review_text, created_at, updated_at');
        if (error) {
            throw error
        }
        return data[0];
    }
    async deleteReview(id: string, customer_id: string) {
        const { data, error } = await this.instance
            .from('reviews')
            .delete()
            .eq('id', id).eq('customer_id', customer_id);
        if (error) {
            console.log(error)
            throw error
        }
        return data;
    }
}
const reviewService = new ReviewService();
export default reviewService;