import { Router } from "express";
import {productController} from '../controllers';

const productRouter = Router();
productRouter.get('/category', productController.getProductByCategory);
productRouter.get('/product_detail', productController.getProductDetailById);
productRouter.get('/', productController.getProducts);


// productRouter.delete('/:id', productController.deleteProduct);
// productRouter.post('/', productController.createProduct);
export default productRouter;