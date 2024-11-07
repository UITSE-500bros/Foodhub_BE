import { Router } from "express";
import productRouter from './product.route'; // Add this line to import productRouter
import categoryRouter from "./category.route";

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);

// router.use('/users', );
// router.use('/orders', );
// router.use('/cart', );

export default router;