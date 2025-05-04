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
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password first"],
    },
    fullname: {
        type: String,
    },
    isVerified: {
        type: Boolean,
    },
    isAdmin: {
        type: Boolean
    }

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel 