import { ObjectId } from "mongodb";

class User {
    userId: ObjectId;
    userName: string;
    userAvatar: string;
    userEmail: string;
    userPassword?: string;
    userPhone?: string;
    userAddress: string;
    createdAt: Date;
    updatedAt: Date;

    favouriteProducts?: ObjectId[] = [];
    
    // for jwt
    forgetPasswordToken?: string;
    forgetPasswordTokenExpire?: Date;

    verificationToken?: string;
    verificationTokenExpire?: Date;
    verificationStatus?: boolean = false;

    refreshToken?: string;
    refreshTokenExpire?: Date;

    constructor({
        id,
        name,
        email,
        picture,
        password,
        phone,
        address,
        createdAt = new Date(),
        updatedAt = new Date(),
        favouriteProducts = [],
        forgetPasswordToken,
        forgetPasswordTokenExpire,
        verificationToken,
        verificationTokenExpire,
        verificationStatus = false,
        refreshToken,
        refreshTokenExpire,
    }: {
        id: string;
        name: string;
        email: string;
        picture: string;
        password?: string;
        phone?: string;
        address?: string;
        createdAt?: Date;
        updatedAt?: Date;
        favouriteProducts?: ObjectId[];
        forgetPasswordToken?: string;
        forgetPasswordTokenExpire?: Date;
        verificationToken?: string;
        verificationTokenExpire?: Date;
        verificationStatus?: boolean;
        refreshToken?: string;
        refreshTokenExpire?: Date;
    }) {
        this.userId = new ObjectId(id);
        this.userName = name;
        this.userAvatar = picture;
        this.userEmail = email;
        this.userPassword = password;
        this.userPhone = phone;
        this.userAddress = address || "Not provided"; // Default if no address is provided
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.favouriteProducts = favouriteProducts;
        this.forgetPasswordToken = forgetPasswordToken;
        this.forgetPasswordTokenExpire = forgetPasswordTokenExpire;
        this.verificationToken = verificationToken;
        this.verificationTokenExpire = verificationTokenExpire;
        this.verificationStatus = verificationStatus;
        this.refreshToken = refreshToken;
        this.refreshTokenExpire = refreshTokenExpire;
    }
}

export default User;
