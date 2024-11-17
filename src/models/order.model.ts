import { ObjectId } from "mongodb";
import { orderStatus,paymentMethod } from "~/utils";
class Order {
    orderId?: ObjectId | null;
    userId: ObjectId;
    products: { productId: ObjectId, productName: string, productImage: string, productPrice: number, quantity: number }[];
    totalPrice: number;
    orderStatus: orderStatus;
    address: string;
    paymentMethod: paymentMethod;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        userId: ObjectId, 
        products: { productId: ObjectId, productName: string, productImage: string, productPrice: number, quantity: number }[], 
        totalPrice: number,
        address: string,
        orderStatus: orderStatus | orderStatus.pending, 
        paymentMethod: paymentMethod,
        createdAt: Date, 
        updatedAt: Date,
        orderId: ObjectId | null = null 
    ) {
        this.orderId = orderId;
        this.userId = userId;
        this.products = products;
        this.totalPrice = totalPrice;
        this.address = address;
        this.orderStatus = orderStatus;
        this.paymentMethod = paymentMethod;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

    }
}

export default Order;