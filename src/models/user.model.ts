import mongoose, { Schema, Document } from "mongoose"
import jwt from "jsonwebtoken"


export interface User extends Document {
    username: string,
    email: string,
    password: string,
    fullname: string,
    isVerified: boolean,
    isAdmin: boolean,
    verifyCode: number,
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken?: string,
    verifyTokenExpiry: Date,
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
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: Number,
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    }

})

UserSchema.methods.generateAccessToken = function (): string {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default User 