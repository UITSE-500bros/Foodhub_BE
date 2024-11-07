import { ObjectId } from "mongodb";

export default class Product{
    productId: ObjectId;
    productName: string;
    productPrice: number;
    productMainImage: string;
    productOtherImages: string[];
    description: string;
    category: string;
    created_at: Date ;
    updated_at: Date ;
    constructor(productId: ObjectId, productName: string, productPrice: number, productMainImage: string, productOtherImages: string[], description: string, category: string, created_at: Date, updated_at: Date) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.productMainImage = productMainImage;
        this.productOtherImages = productOtherImages;
        this.description = description;
        this.category = category;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}