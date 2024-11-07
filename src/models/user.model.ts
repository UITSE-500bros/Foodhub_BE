import { ObjectId } from "mongodb";
 class User {
    userId: ObjectId;
    userName: string;
    userAvatar: string;
    userEmail: string;
    userPassword: string | undefined;
    userPhone: string;
    userAddress: string;
    createdAt: Date;
    updatedAt: Date;

    favouriteProducts: ObjectId[] | null = null;

    // for jwt
    forgetPasswordToken: string | undefined;
    forgetPasswordTokenExpire: Date | undefined;

    verificationToken: string | undefined;
    verificationTokenExpire: Date | undefined;
    verificationStatus: boolean | undefined;

    refreshToken: string | undefined;
    refreshTokenExpire: Date | undefined;

    constructor(userId: ObjectId, userName: string, userAvatar: string, userEmail: string, userPassword: string | undefined, userPhone: string, userAddress: string, createdAt: Date, updatedAt: Date, forgetPasswordToken: string | undefined, forgetPasswordTokenExpire: Date | undefined, verificationToken: string | undefined, verificationTokenExpire: Date | undefined, verificationStatus: boolean | undefined, refreshToken: string | undefined, refreshTokenExpire: Date | undefined) {
        this.userId = userId;
        this.userName = userName;
        this.userAvatar = userAvatar;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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