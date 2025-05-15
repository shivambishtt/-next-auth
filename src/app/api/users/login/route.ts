import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

connectDB()

export async function generateAccessAndRefreshToken(userId) {
    const user = await User.findById(userId) // find by id in TS returns null if not found
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 400 })
    }
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password is required to login" }, { status: 400 })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User with this email does not exists" }, { status: 404 })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid user credentials" }, { status: 400 })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
        const options = {
            httpOnly: true,
            secure: true,
        };
        if (!accessToken || !refreshToken) {
            return NextResponse.json({ message: "Unable to fetch token" })
        }

        const response = NextResponse.json(
            { message: "User logged in sucessfully", success: true },
            { status: 200 },
        )
        response.cookies.set("accessToken", accessToken, options)
        response.cookies.set("refreshToken", refreshToken, options)

        return response
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}