import { Router } from "express";
import reviewController from "../controllers/review.controller";
import { authMiddleware } from "../middlewares";

const reviewRouter = Router();
reviewRouter.get('/product/:product_id', reviewController.getReviewByProductId);
reviewRouter.get('/customer',authMiddleware, reviewController.getReviewsByCustomerId);
reviewRouter.post('/',authMiddleware, reviewController.createReview);
reviewRouter.put('/',authMiddleware, reviewController.updateReview);
reviewRouter.delete('/',authMiddleware, reviewController.deleteReview);

export default reviewRouter;