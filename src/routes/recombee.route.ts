import { Router } from "express";
import recommbeeController from "../controllers/recommber.controller";

const recombeeRouter = Router();

recombeeRouter.get('/', recommbeeController.getRecommendations);
recombeeRouter.get('/item-to-item', recommbeeController.getRecommendationsItemstoItem);
export default recombeeRouter;