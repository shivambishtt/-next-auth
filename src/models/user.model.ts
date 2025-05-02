import mongoose, { Schema, Document } from "mongoose"

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    fullname: string,
    isVerified: boolean,
    isAdmin: boolean,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpriy: Date,
}

export const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        isUnique: true
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        isUnique: true
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel 