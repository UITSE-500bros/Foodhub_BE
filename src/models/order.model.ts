import { ObjectId } from "mongodb";
class Order {
    orderId: ObjectId;
    userId: ObjectId;
    products: { productId: ObjectId,productName:string,productImage:string,productPrice:number, quantity: number }[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(orderId: ObjectId, userId: ObjectId, products: { productId: ObjectId,productName:string,productImage:string,productPrice:number, quantity: number }[], totalPrice: number, createdAt: Date, updatedAt: Date) {
        this.orderId = orderId;
        this.userId = userId;
        this.products = products;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}