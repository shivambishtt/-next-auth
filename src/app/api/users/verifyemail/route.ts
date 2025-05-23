import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const { verifyCode } = await request.json()
        const user = await User.findOne({ verifyToken: verifyCode, verifyTokenExpiry: { $gt: Date.now()} })
        console.log(user);
        
        if (!user) {
            return NextResponse.json({ message: "Invalid access token" }, { status: 400 })
        }
        user.isVerified = true
        user.verifyToken = undefined
        await user.save()

        return NextResponse.json({ message: "Email verified successfully", success: true }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ message: "Error occured while verifying the email" }, { status: 400 })
    }
}