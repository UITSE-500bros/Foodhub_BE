import { Router } from "express";
import productRouter from './product.route';
import categoryRouter from "./category.route";
import userRouter from "./user.route";
import orderRouter from "./order.route";
import cartRouter from "./cart.route";

const router = Router();

router.use('/api/products', productRouter);
router.use('/api/categories', categoryRouter);
router.use('/api/users', userRouter);
router.use('/api/orders', orderRouter);
router.use('/api/cart', cartRouter);

export default router;