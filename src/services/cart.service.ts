import mongoService from './mongo.service';
class cartService {
    async createCartByUserID(userId: string) {
        const cartCollection = await mongoService.getCollection('Cart');
        const cart = {
            userId: userId,
            products: []
        };
        return await cartCollection.insertOne(cart);
    }
    async getCartByUserID(userId: string) {
        const cartCollection = await mongoService.getCollection('Cart');
        return await cartCollection.findOne({ userId: userId });
    }
    async updateCartByUserID(userId: string, products: any) {
        const cartCollection = await mongoService.getCollection('Cart');
        return await cartCollection.updateOne({ userId: userId }, { $set: { products: products } });
    }
    async updateProductQuantity(userId: string, productId: string, quantity: number) {
        const cartCollection = await mongoService.getCollection('Cart');
        return await cartCollection.updateOne({ userId: userId, 'products.productId': productId }, { $set: { 'products.$.quantity': quantity } });
    }
}
export default new cartService();