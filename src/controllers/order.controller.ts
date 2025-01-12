import qs from 'qs'
import crypto from 'crypto'
import moment from 'moment'
import { Request, Response } from 'express';
import { sortObject } from '../utils';
import { orderService } from '../services';
import { AuthenticatedRequest } from '../middlewares/authorize';
class OrderController {
  async getOrderDetail(req: Request, res: Response) {
    const {user_id, order_id} = req.params;
    if (!user_id) {
      return res.status(400).json("Missing required fields: user_id");
    }
    try {
      const order = await orderService.getOrderDetail(user_id, order_id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
  async getOrders(req: AuthenticatedRequest, res: Response) {
    const user_id = req.customerId;
    if (!user_id) {
      return res.status(400).json("Missing required fields: user_id");
    }
    try {
      const order = await orderService.getOrders(user_id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }

  }
  async updateAnOrder(req: Request, res: Response) {
    const {order_id} = req.params;
    const updateData = req.body;
    if (!order_id) {
      return res.status(400).json("Missing required fields: order_id");
    }
    try {
      const order = await orderService.updateAnOrder(order_id, updateData);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }

  }

  async cancelAnOrder(req: Request, res: Response) {
    const {order_id} = req.params;
    if (!order_id) {
      return res.status(400).json("Missing required fields: order_id");
    }
    try {
      const order = await orderService.cancelAnOrder(order_id);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }

  async createPaymentUrl(req: AuthenticatedRequest, res: Response) {
    try {
      const amount: number = req.body.amount;
      if (amount < 5000) {
        return res.status(400).json("The amount must be larger than 5000 VND");
      }
  
      process.env.TZ = 'Asia/Ho_Chi_Minh';
      const date = new Date();
      const createDate = moment(date).format('YYYYMMDDHHmmss');
      const ipAddr = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
      const tmnCode: string = process.env.VNP_TMN_CODE;
      const secretKey: string = process.env.VNP_HASH_SECRET;
      const vnpUrl: string = process.env.VNP_URL;
      const returnUrl: string = process.env.VNP_RETURN_URL;
      const customerId: string = 'ab68e9b6-7c05-4f8c-83d1-d9a623950b58';
  
      const orderId = await orderService.generateOrderId(customerId, amount, req.body.products, req.body.delivery_address);
      const bankCode: string = req.body.bankCode;
      const locale: string = req.body.language || 'vn';
      const currCode = 'VND';
  
      const vnp_Params: Record<string, string | number> = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        // vnp_ExpireDate: moment(date).add(15, 'minutes').format('YYYYMMDDHHmmss'),
      };
  
      if (bankCode) {
        vnp_Params['vnp_BankCode'] = bankCode;
      }
  
      const sortedParams = sortObject(vnp_Params);
      const signData = qs.stringify(sortedParams, { encode: false });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
      sortedParams['vnp_SecureHash'] = signed;
  
      const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;
      return res.status(200).json(paymentUrl);
    } catch (error) {
      console.error('Error in createPaymentUrl:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
  
  async getReturn(req: Request, res: Response) {
    try {
      const vnp_Params = req.query as Record<string, string>;
      const secureHash = vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
  
      const sortedParams = sortObject(vnp_Params);
      const signData = qs.stringify(sortedParams, { encode: false });
      const hmac = crypto.createHmac('sha512', process.env.VNP_HASH_SECRET!);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
      
      if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        await orderService.updateOrderStatus(orderId, vnp_Params['vnp_ResponseCode']);
        
        switch (vnp_Params['vnp_ResponseCode']) {
          case '00':
            return res.status(200).json('Transaction successful');
          case '01':
            return res.status(400).json('Transaction incomplete');
          case '02':
            return res.status(400).json('Transaction error');
          case '04':
            return res.status(400).json('Reversed transaction: customer charged but transaction failed');
          case '05':
            return res.status(202).json('Transaction is being processed by VNPAY (refund)');
          case '06':
            return res.status(202).json('Refund request sent to bank by VNPAY');
          case '07':
            return res.status(403).json('Transaction suspected of fraud');
          case '09':
            return res.status(400).json('Refund transaction rejected');
          default:
            return res.status(400).json('Unknown response code');
        }
      } else {
        return res.status(404).json('Invalid payment');
      }
    } catch (error) {
      console.error('Error in getReturn:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }
  async shipCod(req: Request, res: Response) {
    const { products, amount ,delivery_address} = req.body;
    try {
      const orderId = await orderService.shipCod('ab68e9b6-7c05-4f8c-83d1-d9a623950b58', amount, products,delivery_address);
      return res.status(200).json(`Order ${orderId} created successfully`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
const orderController = new OrderController();
export default orderController;
