import { Request, Response } from 'express';
import { userService } from '../services';
import { AuthenticatedRequest } from 'src/middlewares/authorize';
// import { User } from '../models';
import qs from 'qs'
import crypto from 'crypto'
import moment from 'moment'

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
  async createPaymentUrl(req: Request, res: Response) {
    const amount: number = req.body.amount;
    if (amount < 5000) {
      return res.status(404).json("The amount must be larger than 5000 vnd")
    }

    process.env.TZ = 'Asia/Ho_Chi_Minh'
    const date = new Date()
    const createDate = moment(date).format('YYYYMMDDHHmmss')
    const ipAddr = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
    const tmnCode: string = process.env.VNP_TMN_CODE
    const secretKey: string = process.env.VNP_HASH_SECRET
    const vnpUrl: string = process.env.VNP_URL
    const returnUrl: string = process.env.VNP_RETURN_URL
    const orderId = moment(date).format('DDHHmmss');


    const bankCode: string = req.body.bankCode
    let locale: string = req.body.language
    if (!locale) {
      locale = 'vn'
    }
    const currCode = 'VND'
    try {
      const vnp_Params: Record<string, string | number> = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}, ${JSON.stringify(req.body.products)}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
      }
      if (bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode
      }
      const sortedParams = sortObject(vnp_Params)
      const signData = qs.stringify(sortedParams, { encode: false })
      const hmac = crypto.createHmac('sha512', secretKey)
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
      sortedParams['vnp_SecureHash'] = signed
      const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;
      return res.status(200).json(paymentUrl);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getReturn(req: Request, res: Response) {
    const vnp_Params = req.query;
    // Lấy vnp_SecureHash và loại bỏ để kiểm tra chữ ký
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = sortObject(vnp_Params as Record<string, string>);
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET as string);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash === signed) {
      console.log(vnp_Params['vnp_OrderInfo']);
      return res.status(200).json('Payment success');
    } else {
      return res.status(404).json('Invalid payment');
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
      await userService.loginWithProvider('facebook');
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }
  async redirectCallback(req: Request, res: Response) {
    const { params, errorCode } = req.query;
    if (errorCode) {
      throw new Error(errorCode as string);
    }
    const { access_token, refresh_token } = params as { access_token: string, refresh_token: string };

    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }
    const session = await userService.setSession(access_token as string, refresh_token as string);
    return res.status(200).json(session);
  }
}
export default new userController();

function sortObject(obj: { [key: string]: any }): { [key: string]: string } {
  const sorted: { [key: string]: string } = {};
  const keys: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(encodeURIComponent(key));
    }
  }

  keys.sort();

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    sorted[key] = encodeURIComponent(obj[decodeURIComponent(key)]).replace(/%20/g, "+");
  }

  return sorted;
}