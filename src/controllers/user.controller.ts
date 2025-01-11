import { Request, Response } from 'express';
import { userService } from '../services';
import { AuthenticatedRequest } from 'src/middlewares/authorize';
// import { User } from '../models';


class UserController {
  async getFavorites(req: AuthenticatedRequest, res: Response) {
    try {
      const id = req.customerId;

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
  async removeFavorite(req: AuthenticatedRequest, res: Response) {
    try {
      const { productId } = req.body;
      const userId = req.customerId;
      if (!productId) {
        throw new Error('Missing required fields: id, productId');
      }
      const result = await userService.removeFavorite(userId, productId);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async removeAllFavorites(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.customerId;
      const result = await userService.removeAllFromFavorites(userId);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.customerId;
      const updateData = req.body;
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


  async loginGoogle(req: Request, res: Response) {
    try {
      const data = await userService.loginWithProvider('google');
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).send((error as Error).message);
    }
  }
  async loginFacebook(req: Request, res: Response) {
    try {
      const data = await userService.loginWithProvider('facebook');
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).send((error as Error).message);
    }
  }
  async retrieveSession(req: Request, res: Response) {
    const { access_token, refresh_token } = req.body;
    const result = await userService.setSession(access_token, refresh_token);
    if (!result) {
      return res.status(400).json({ login: 'Login failed' });
    }
    return res.status(200).json({ login: 'Login success' });
  }

  async redirectCallback(req: Request, res: Response) {
    const accessToken = req.query.access_token as string;
    const refreshToken = req.query.refresh_token as string;
    if (accessToken && refreshToken) {
      res.redirect('com.se.foodhub://login');
    } else {
      console.log('Access token not found in query parameters');
      res.status(400).send('Access token not found');
    }
  }

  async getDeliveryAddress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error('Missing required fields: id');
      }
      const address = await userService.getDeliveryAddress(id);
      res.status(200).send(address);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async verifyPhoneNumber(req: Request, res: Response) {
    try {
      const { phoneNumber } = req.body;
      if (!phoneNumber) {
        throw new Error('Missing required fields: phoneNumber');
      }
      const result = await userService.verifyPhoneNumber(phoneNumber);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send((error as Error).message);
    }
  }
  async verifyOTP(req: Request, res: Response) {
    try {
      const { phoneNumber, otp } = req.body;
      if (!phoneNumber || !otp) {
        throw new Error('Missing required fields: phoneNumber, otp');
      }
      const result = await userService.verifyOTP(phoneNumber, otp);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(200).send((error as Error).message);
    }
  }
  async removeAllFromFavorites(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.customerId;
      const result = await userService.removeAllFromFavorites(userId);
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }
  
}
export const userController = new UserController();
export default userController;