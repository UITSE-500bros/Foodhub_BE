import { Router } from "express";
import {productController} from '../controllers';

const productRouter = Router();
productRouter.get('/getAllProducts', productController.getProducts);

export default productRouter;