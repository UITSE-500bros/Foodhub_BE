import { Router } from "express";
import {categoryController} from "~/controllers";

const categoryRouter = Router();
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/", );
categoryRouter.put("/", );
categoryRouter.delete("/", );

export default categoryRouter;
