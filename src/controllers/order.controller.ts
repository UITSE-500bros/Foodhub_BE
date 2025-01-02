import qs from 'qs'
import crypto from 'crypto'
import moment from 'moment'
import { Request, Response } from 'express';
import { sortObject } from '../utils';
import { orderService } from '../services';
class orderController {
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
  async getOrders(req: Request, res: Response) {
    const {user_id} = req.params;
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
        vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
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
}

export default new orderController()
