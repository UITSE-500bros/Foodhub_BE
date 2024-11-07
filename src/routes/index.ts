import { Router } from "express";
import productRouter from './product.route'; // Add this line to import productRouter

const router = Router();

router.use('/products', productRouter);

export default router;