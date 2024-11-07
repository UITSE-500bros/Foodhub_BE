import { Order } from '~/models';
import mongoService from './mongo.service';
import { ObjectId } from 'mongodb';

class OrderService {
  async getOrdersByUserId(userId: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      return await ordersCollection.find({userId: userId}).toArray();
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  }

  async getOrderById(id: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      return await ordersCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error getting order by id:', error);
      throw error;
    }
  }

  async createOrder(order: Order) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      const result = await ordersCollection.insertOne(order);
      return result.insertedId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async updateOrder(id: string, order: Order) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      const result = await ordersCollection.updateOne({ _id: new ObjectId(id) }, { $set: order });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  async deleteOrder(id: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}