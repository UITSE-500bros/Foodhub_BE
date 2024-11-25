import { Router } from "express";
import {productController} from '../controllers';

const productRouter = Router();
productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductDetailById);
productRouter.get('/category/:id', productController.getProductByCategory);

// productRouter.get('/')

// productRouter.delete('/:id', productController.deleteProduct);
// productRouter.post('/', productController.createProduct);
// productRouter.put('/:id', productController.updateProduct);
export default productRouter;