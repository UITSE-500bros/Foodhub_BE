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
        const { product_id } = req.body;
        // Fetch the product details to get the brand of the selected product
        const product = await productService.getProductById(product_id);

        const brand = product[0].brand; // Ensure the product object includes the brand
        // Use the `filter` parameter to include only items with the same brand
        const response = await client.send(
            new requests.RecommendItemsToItem(
                product_id,
                "e343107d-e15b-482c-9430-e34395928907", // Your Recombee user session ID
                5, // Number of recommendations
                {
                    scenario: "brand_recomm",
                    filter: `'brand' == "${brand}"` // Filters items with the same brand
                }
            )
        );
        

        // Fetch details of the recommended products
        const productList = await Promise.all(
            response.recomms.map(async (item) => {
                console.log(item.id); // Log recommended item IDs
                return productService.getProductById(item.id); // Fetch full product details
            })
        );

        return res.status(200).json(productList);

    }
    async getRecommendationsOnOrdersHistory(req: AuthenticatedRequest, res: Response) {


    }
    async getSimilarItems(req: AuthenticatedRequest, res: Response) {

    }

}
const recommbeeController = new RecommbeeController();
export default recommbeeController;