import { Router } from "express";
import productRouter from './product.route';
import categoryRouter from "./category.route";
import userRouter from "./user.route";
import orderRouter from "./order.route";
import cartRouter from "./cart.route";
import bucketRouter from "./bucket.route";

const router = Router();

router.use('/api/product', productRouter);
router.use('/api/category', categoryRouter);
router.use('/api/user', userRouter);
router.use('/api/order', orderRouter);
router.use('/api/cart', cartRouter);
router.use('/api/bucket', bucketRouter);

export default router;