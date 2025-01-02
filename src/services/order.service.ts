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

  async generateOrderId(customerId, amount, products) {
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
            .from("product")
            .select("product_quantity")
            .eq("product_id", product_id)
            .single();

          if (selectError) throw selectError;

          const { error: updateError } = await this.instance
            .from("product")
            .update({ product_quantity: productData.product_quantity - quantity })
            .eq("product_id", product_id);

          if (updateError) throw updateError;
        } catch (err) {
          console.error("Error updating product:", err);
        }
      })
    );

    return data.receipt_id;
  }

  async updateOrderStatus(orderId, responseCode) {
    const status = responseCode === "00" ? "Transaction successful" : "Transaction error";

    if (responseCode !== "00") {
      const { data: orderData, error: orderError } = await this.instance
        .from("order")
        .select("product_list")
        .eq("receipt_id", orderId)
        .single();

      if (orderError) throw orderError;

      await Promise.all(
        orderData.product_list.map(async ({ product_id, quantity }) => {
          try {
            const { data: productData, error: selectError } = await this.instance
              .from("product")
              .select("product_quantity")
              .eq("product_id", product_id)
              .single();

            if (selectError) throw selectError;

            const { error: updateError } = await this.instance
              .from("product")
              .update({ product_quantity: productData.product_quantity - quantity })
              .eq("product_id", product_id);

            if (updateError) throw updateError;
          } catch (err) {
            console.error("Error updating product:", err);
          }
        })
      );
    }

    const { data, error } = await this.instance
      .from("order")
      .update({ transaction_status: status })
      .eq("receipt_id", orderId);

    if (error) throw error;
    return data;
  }
}
const orderService = new OrderService();
export default orderService;