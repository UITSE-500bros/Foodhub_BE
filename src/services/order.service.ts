import supabaseClient from './postgresql.service';

class OrderService {
  private instance: any;
  private table = 'orders';
  constructor() {
    this.instance = supabaseClient.getInstance();
  }
  async getOrderDetail(user_id: string, order_id: string) {
    const {data, error} = await this.instance.from(this.table).select('*').eq('user_id', user_id).eq('order_id', order_id);
    if (error) {
      console.error('Error getting order detail:', error);
      throw error;
    }
    return data;
  }
  async getOrders(user_id: string) {
    const {data, error} = await this.instance.from(this.table).select('*').eq('user_id', user_id);
    if (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
    return data;
  }
  async updateAnOrder(order_id: string, updateData: any) {
    const {data, error} = await this.instance.from(this.table).update(updateData).eq('order_id', order_id);
    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }
    return data;
  }
  async cancelAnOrder(order_id: string) {
    const {data, error} = await this.instance.from(this.table).delete().eq('order_id', order_id);
    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
    return data;
  }

  
}
const orderService =  new OrderService();
export default orderService;