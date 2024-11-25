import { Request, Response } from 'express';
import { userService } from '../services';

class userController {
    async getInfo(req: Request, res: Response) {
        const {id} = req.params;
        return await userService.getUserById(id);

    }
    async createUser(req: Request, res: Response) {}
    async updateInfo(req: Request, res: Response) {
    }
}
export default new userController();