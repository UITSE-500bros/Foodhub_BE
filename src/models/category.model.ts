import { ObjectId } from "mongodb";

export default class Category{
    categoryId: ObjectId;
    categoryName: string;
    categoryImage: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(categoryId: ObjectId, categoryName: string, categoryImage: string, createdAt: Date, updatedAt: Date) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}