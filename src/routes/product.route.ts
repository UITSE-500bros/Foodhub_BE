import { Router } from "express";
import productController from "~/controllers/product.controller";

const productRouter = Router();
productRouter.get('/', productController.getProducts);

export default productRouter;