import { User } from "../models";
import mongoService from "./mongo.service";
import { ObjectId } from "mongodb";

class UserService {

    async getUserById(id: string) {
        // Get user by id logic here
        const usersCollection = await mongoService.getCollection('Users');
        return await usersCollection.findOne({ _id: new ObjectId(id) });

    }
    async updateUser(id: string, user: User) {
        // Update user logic here
        const usersCollection = await mongoService.getCollection('Users');
        const result = await usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: user });
        return result.modifiedCount;
    }

    async createUser(user: User) {
        // Create user logic here
        const usersCollection = await mongoService.getCollection('Users');
        await usersCollection.insertOne(user);

        return {...user};
    }
}
const userService = new UserService();
export default userService;