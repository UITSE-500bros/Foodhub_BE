import { Router } from "express";
import {categoryController} from "../controllers";

const categoryRouter = Router();
categoryRouter.get("/getall", categoryController.getAllCategories);


export default categoryRouter;
