import { Router } from "express";
import {productController} from "~/controllers";

const productRouter = Router();
productRouter.get('/', productController.getProducts);

export default productRouter;