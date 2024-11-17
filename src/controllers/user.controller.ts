import { Request, Response } from 'express';
import {userService} from '../services';

class userController {
    async getUserByEmailPassword(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await userService.getUserByEmailPassword(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error getting user' });
        }
    }
    async createUser(req: Request, res: Response) {
        try {
            const user = req.body;
            const userId = await userService.createUser(user);
            res.status(200).json(userId);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
    
}
export default new userController();