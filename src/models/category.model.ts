
export default class Category {
    categoryName: string;
    categoryImage: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(categoryName: string, categoryImage: string | null, createdAt: Date, updatedAt: Date) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage || null;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
