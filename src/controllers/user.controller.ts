import { Request, Response } from 'express';
// import { userService } from '../services';
import { User } from '../models';

class userController {
    async createUser(req: Request, res: Response) {
        try {
            const {id, name, email, picture} = req.body;
            if (!id || !name || !email || !picture) {
                throw new Error('Missing required fields: id, name, email');
            }
            const newUser = new User({ id, name, email, picture });
            console.log(newUser);
            // const user = await userService.createUser(newUser);
            res.status(201).send("User created successfully");
        } catch (error) {
            res.status(400).send(error);
        }
    } 
    async updateInfo(req: Request, res: Response) {
    }
}
export default new userController();