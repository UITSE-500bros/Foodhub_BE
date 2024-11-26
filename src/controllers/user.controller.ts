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
            console.log(user);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    } 
    async updateInfo(req: Request, res: Response) {
    }
}
export default new userController();