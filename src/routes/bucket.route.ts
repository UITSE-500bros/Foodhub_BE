import { Router } from "express";
import bucketController from "../controllers/bucket.controller";

const bucketRouter = Router();
bucketRouter.get('/', bucketController.getBucket);

export default bucketRouter;