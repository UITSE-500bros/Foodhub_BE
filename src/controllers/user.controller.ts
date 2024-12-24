import { Request, Response } from 'express';
import { userService } from '../services';
import { AuthenticatedRequest } from 'src/middlewares/authorize';
// import { User } from '../models';

class userController {
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
    async addFavorite(req: AuthenticatedRequest, res: Response) {
        try {
            const { productId } = req.body;
            const userId = req.customerId;
            if (!productId) {
                throw new Error('Missing required fields: id, productId');
            }
            const result = await userService.addFavorite(userId, productId);
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async updateProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const userId = req.customerId;
            const updateData = req.body; // Lấy dữ liệu cập nhật từ body request
            // Gọi service để cập nhật thông tin user
            const updatedUser = await userService.updateUserProfile(userId, updateData);

            // Nếu không tìm thấy user
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            // Trả về thông tin user đã được cập nhật
            return res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
export default new userController();