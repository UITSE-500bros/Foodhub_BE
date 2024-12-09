import { Request, Response } from 'express'
import { orderService } from '../services'
import dotenv from 'dotenv'
import Stripe from 'stripe'
dotenv.config()

class orderController {
  async getOrderDetail(req: Request, res: Response) {
    try {
      const { orderId } = req.params
      const order = await orderService.getOrderDetailById(orderId)
      res.status(200).json(order)
    } catch (error) {
      res.status(400).json({ message: 'Error getting order detail' })
    }
  }
  async trackOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params
      const order = await orderService.trackOrder(orderId)
      res.status(200).json(order)
    } catch (error) {
      res.status(400).json({ message: 'Error tracking order' })
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params

      const isUpdatable = await orderService.checkIsUpdatable(orderId)

      if (!isUpdatable) {
        return res.status(400).json({ message: 'Your order is no longer updatable' })
      }

      const order = await orderService.updateOrder(orderId, req.body)
      return res.status(200).json(order)
    } catch (error) {
      return res.status(400).json({ message: 'Error updating order' })
    }
  }
  async getOrdersByUserID(req: Request, res: Response) {
    try {
      const { userId } = req.params
      const orders = await orderService.getOrdersByUserId(userId)
      res.status(200).json(orders)
    } catch (error) {
      res.status(400).json({ message: 'Error getting orders' })
    }
  }

  async createPaymentIntent(req: Request, res: Response) {
    try {
      const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
      const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: '2024-11-20.acacia',
        typescript: true
      });

      const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: process.env.CUSTOMER_ID },
        { apiVersion: '2024-11-20.acacia' }
      );

      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1500000,
        currency: 'vnd',
        payment_method_types: ['card'],
        customer: process.env.CUSTOMER_ID,
      });

      return res.status(200).json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: process.env.CUSTOMER_ID
      });
    } catch (e) {
      return res.status(400).json({
        error: e
      });
    }
  }
}

export default new orderController()
