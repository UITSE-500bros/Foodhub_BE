import { ObjectId } from "mongodb";

class User {
    userName: string;
    userAvatar: string;
    userEmail: string;
    
    userPassword?: string = "Not provided";
    userPhone?: string = "Not provided";
    userAddress: string = "Not provided"; // Default if no address is provided
    createdAt: Date;
    updatedAt: Date;

    favouriteProducts?: ObjectId[] = [];
    //auth
    userGGId?: string = "Not provided";
    userMetaId?: string = "Not provided";
    
    constructor({
        name,
        email,
        picture,
        password,
        googleId,
        metaId,
        phone,
        address,
        createdAt = new Date(),
        updatedAt = new Date(),
        favouriteProducts = [],

    }: {
        id?: string;
        name: string;
        email: string;
        picture: string;
        password?: string;
        googleId?: string;
        metaId?: string;
        phone?: string;
        address?: string;
        createdAt?: Date;
        updatedAt?: Date;
        favouriteProducts?: ObjectId[];

    }) {
        this.userName = name;
        this.userAvatar = picture;
        this.userEmail = email;
        this.userPassword = password || "Not provided";
        this.userGGId = googleId || "Not provided";
        this.userMetaId = metaId || "Not provided";
        this.userPhone = phone || "Not provided";
        this.userAddress = address || "Not provided"; // Default if no address is provided
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.favouriteProducts = favouriteProducts || [];

    }
}

export default User;
