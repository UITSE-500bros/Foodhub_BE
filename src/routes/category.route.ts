import { Router } from "express";
import {categoryController} from "~/controllers";

const categoryRouter = Router();
categoryRouter.get("/getall", categoryController.getAllCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/", );
categoryRouter.delete("/", );

export default categoryRouter;
