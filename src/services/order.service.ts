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

  async getOrderDetailById(id: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      return await ordersCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error getting order by id:', error);
      throw error;
    }
  }

  async trackOrder(id: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      return await ordersCollection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }

  async checkIsUpdatable (id: string) {
    try {
      const ordersCollection = await mongoService.getCollection('Orders');
      const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
      if (!order) {
        return false;
      }

      if(order.status !== 'PENDING') {
        return false;
      }

      const currentDate = new Date();
      const orderDate = new Date(order.createdAt);
      const diff = currentDate.getTime() - orderDate.getTime();
      
      const diffInMinutes = diff / (1000 * 60);
      if (diffInMinutes > 30) {
        return false;
      }
      return true;

    } catch (error) {
      console.error('Error checking if order is updatable:', error);
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
export default new OrderService();