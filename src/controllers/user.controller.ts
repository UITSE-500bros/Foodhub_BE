import { Request, Response } from 'express';
import { userService } from '../services';
import { User } from '../models';

class userController {
    async createUser(req: Request, res: Response) {
        try {
            const {email, family_name,given_name,id,name,picture} = req.body;
            if (!id || !name || !email || !picture || !family_name || !given_name ) {
                throw new Error('Missing required fields: id, name, email');
            }
            let googleId = id;
            const newUser = new User({
                googleId,
                name,
                email,
                picture,
            });
            const user = await userService.createUser(newUser);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    } 
    async updateInfo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { email, name, picture } = req.body;
            if (!id || !email || !name || !picture) {
                throw new Error('Missing required fields: id, name, email');
            }
            const user = new User({
                email,
                name,
                picture,
            });
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
    async getFavorites(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error('Missing required fields: id');
            }
            const favorites = await userService.getFavourites(id);
            res.status(200).send(favorites);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
    async addFavorite(req: Request, res: Response) {
        try {
            const { id, productId } = req.params;
            if (!id || !productId) {
                throw new Error('Missing required fields: id, productId');
            }
            const result = await userService.addFavourite(id, productId);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
}
export default new userController();