import supabaseClient from './postgresql.service';

class OrderService {
  private instance: any;
  private table = 'orders';
  constructor() {
    this.instance = supabaseClient.getInstance();
  }
  async getOrderDetail(customer_id: string, order_id: string) {
    const { data, error } = await this.instance.from(this.table).select('*').eq('customer_id', customer_id).eq('order_id', order_id);
    if (error) {
      console.error('Error getting order detail:', error);
      throw error;
    }
    return data;
  }
  async getOrders(customer_id: string) {
    const { data, error } = await this.instance.from(this.table).select('*').eq('customer_id', customer_id);
    if (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
    return data;
  }
  async updateAnOrder(order_id: string, updateData: any) {
    const { data, error } = await this.instance.from(this.table).update(updateData).eq('order_id', order_id);
    if (error) {
      console.error('Error updating order:', error);
      throw error;
    }
    return data;
  }
  async cancelAnOrder(order_id: string) {
    const { data, error } = await this.instance.from(this.table).delete().eq('order_id', order_id);
    if (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
    return data;
  }

  async generateOrderId(customerId: string, amount: number, products: any) {
    const { data, error } = await this.instance
      .from("orders")
      .insert({ customer_id: customerId, total: amount, product_list: products })
      .select()
      .single();

    if (error) throw error;

    await Promise.all(
      products.map(async ({ product_id, quantity }) => {
        try {
          const { data: productData, error: selectError } = await this.instance
            .from("products")
            .select("quantity")
            .eq("id", product_id)
            .single();

          if (selectError) throw selectError;

          const { error: updateError } = await this.instance
            .from("products")
            .update({ quantity: productData.quantity - quantity })
            .eq("id", product_id);

          if (updateError) throw updateError;
        } catch (err) {
          console.error("Error updating product:", err);
        }
      })
    );

    return data.id;
  }

  async updateOrderStatus(orderId, responseCode) {
    const status = responseCode === "00" ? "Transaction successful" : "Transaction error";

    if (responseCode !== "00") {
      const { data: orderData, error: orderError } = await this.instance
        .from("orders")
        .select("product_list")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;

      await Promise.all(
        orderData.product_list.map(async ({ product_id, quantity }) => {
          try {
            const { data: productData, error: selectError } = await this.instance
              .from("products")
              .select("quantity")
              .eq("id", product_id)
              .single();

            if (selectError) throw selectError;

            const { error: updateError } = await this.instance
              .from("products")
              .update({ quantity: productData.quantity - quantity })
              .eq("id", product_id);

            if (updateError) throw updateError;
          } catch (err) {
            console.error("Error updating product:", err);
          }
        })
      );
    }

    const { data, error } = await this.instance
      .from("orders")
      .update({ transaction_status: status })
      .eq("id", orderId)
      .select();

    if (error) throw error;
    console.log("Order status updated:", data);
    return data;
  }
  async shipCod(order_id: string) {
    
  }
}
const orderService = new OrderService();
export default orderService;