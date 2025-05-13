import mongoose, { Schema, Document } from "mongoose"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"


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
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY

    if (!accessTokenSecret || !accessTokenExpiry) {
        throw new Error("Access token secret undefined or not loaded properly")
    }
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
    },
        accessTokenSecret,
        { expiresIn: accessTokenExpiry }
    )
}
UserSchema.methods.generateRefreshToken = function (): string {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
    const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY

    if (!refreshTokenSecret || !refreshTokenExpiry) {
        throw new Error("Refresh token secret undefined or not loaded properly")
    }
    return jwt.sign({
        _id: this._id
    },
        refreshTokenSecret,
        { expiresIn: refreshTokenExpiry }
    )
}

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default User 