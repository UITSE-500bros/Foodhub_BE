import { ApiClient, requests } from "recombee-api-client";
import { AuthenticatedRequest } from "../middlewares/authorize";
import { Response } from "express";
import { productService } from "../services";

const client = new ApiClient(
    process.env.RECOMBEE_DATABASE_ID,
    process.env.RECOMBEE_DATABASE_PRIVATE_TOKEN,
    { region: "ap-se" }
);



class RecommbeeController {
    async getRecommendations(req: AuthenticatedRequest, res: Response) {
        const response = await client.send(new requests.RecommendItemsToUser("e343107d-e15b-482c-9430-e34395928907", 5));
        const productList = await Promise.all(
            response.recomms.map(async (item) => {
                console.log(item.id);
                return productService.getProductById(item.id);
            })
        );

        return res.json(productList);
    }
    async getRecommendationsItemstoItem(req: AuthenticatedRequest, res: Response) {

    }
    async getRecommendationsOnOrdersHistory(req: AuthenticatedRequest, res: Response) {

    }
    async getSimilarItems(req: AuthenticatedRequest, res: Response) {

    }

}
const recommbeeController = new RecommbeeController();
export default recommbeeController;