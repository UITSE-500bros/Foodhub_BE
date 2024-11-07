import { User } from "~/models";
import mongoService from "./mongo.service";
import { ObjectId } from "mongodb";

class userService {
    async createUser(user: User) {
        // Create user logic here
        const usersCollection = await mongoService.getCollection('Users');
        const result = await usersCollection.insertOne(user);
        return result.insertedId;
    }
    async getUserById(id: string) {
        // Get user by id logic here
        const usersCollection = await mongoService.getCollection('Users');
        return await usersCollection.findOne({ _id: new ObjectId(id) });

    }
    async getUserByEmailPassword(email: string,password: string) {
        // Get user by id logic here
        const usersCollection = await mongoService.getCollection('Users');
        return await usersCollection.findOne({ email: email, password: password });

    }
    async updateUser(id: string, user: User) {
        // Update user logic here
        const usersCollection = await mongoService.getCollection('Users');
        const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
        return result.modifiedCount;
    }
    async deleteUser(id: string) {
        // Delete user logic here
        const usersCollection = await mongoService.getCollection('Users');
        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    }
    

}
export default new userService();