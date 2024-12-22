import { Request, Response } from 'express';
import { userService } from '../services';
// import { User } from '../models';

class userController {
    async register(req: Request, res: Response) {

    }
    async login(req: Request, res: Response) {
        
    }
    async getFavorites(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error('Missing required fields: id');
            }
            const favorites = await userService.getFavorites(id);
            res.status(200).send(favorites);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
    async addFavorite(req: Request, res: Response) {
        try {
            const { productId } = req.body;
            const id = '1';
            if ( !productId) {
                throw new Error('Missing required fields: id, productId');
            }
            const result = await userService.addFavorite(id, productId);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async loginWithGoogle(req: Request, res: Response) {

    }
}
export default new userController();