import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ message: "Both fields are required" }, { status: 400 })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User with this email is not registered" }, { status: 400 })
        }
        const response = NextResponse.json({ message: "User logged out successfully", sucess: true }, { status: 200 })
        const accessToken = user.accessToken
        const refreshToken = user.refreshToken
        response.cookies.delete({ accessToken, refreshToken })
        return response
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }

}