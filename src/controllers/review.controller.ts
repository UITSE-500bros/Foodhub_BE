import { Request, Response } from 'express';
import { AuthenticatedRequest } from "../middlewares/authorize";
import reviewService from '../services/review.service';

class ReviewController {
    
    async getReviewsByCustomerId(req:AuthenticatedRequest, res: Response) {
        try{
            const customer_id = req.customerId;
            const reviews = await reviewService.getReviewsByCustomerId(customer_id);
            return res.json(reviews);
        }catch(error){
            return res.status(500).json({message: (error as Error).message});
        }
    }
    async getReviewByProductId(req:Request, res: Response) {
        try{
            const product_id = req.params.product_id;
            const reviews = await reviewService.getReviewsByProductId(product_id);
            return res.json(reviews);
        }catch(error){
            return res.status(500).json({message: (error as Error).message});
        }
        
    }
    async createReview(req:AuthenticatedRequest, res: Response) {
        try{
            const customer_id = req.customerId;
            const {product_id, review_rate, review_text} = req.body;
            const reviews = await reviewService.createReview(product_id, review_rate, review_text, customer_id);
            return res.json(reviews);
        }catch(error){
            return res.status(500).json({message: (error as Error).message});
        }
        
    }
    async updateReview(req:AuthenticatedRequest, res: Response) {
        try{
            const customer_id = req.customerId;
            const {product_id, review_rate, review_text} = req.body;
            const reviews = await reviewService.updateReview(product_id, review_rate, review_text, customer_id);
            return res.json(reviews);
        }catch(error){
            return res.status(500).json({message: (error as Error).message});
        }
        
    }
    async deleteReview(req:AuthenticatedRequest, res: Response) {
        try{
            const customer_id = req.customerId;
            const {review_id} = req.body;
            const reviews = await reviewService.deleteReview(review_id, customer_id);
            return res.json(reviews);
        }catch(error){
            return res.status(500).json({message: (error as Error).message});
        }
    }

}
const reviewController = new ReviewController();
export default reviewController;