import { Router } from "express";
import {productController} from '../controllers';

const productRouter = Router();
productRouter.get('/category', productController.getProductByCategory);
productRouter.get('/product_detail', productController.getProductDetailById);
productRouter.get('/new_arrivals', productController.getNewArrivals);
productRouter.get('/best_seller', productController.getBestSeller);
productRouter.get('/exclusive', productController.getExclusive);

productRouter.get('/', productController.searchProduct);


// productRouter.delete('/:id', productController.deleteProduct);
// productRouter.post('/', productController.createProduct);
export default productRouter;