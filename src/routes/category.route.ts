import { Router } from "express";
import {categoryController, productController} from "../controllers";

const categoryRouter = Router();
categoryRouter.get("/getall", categoryController.getAllCategories);
categoryRouter.get("/", productController.getProductByCategory);
export default categoryRouter;
