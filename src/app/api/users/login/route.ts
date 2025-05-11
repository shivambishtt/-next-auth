import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        const user = await User.findOne(email)
        if (!user) {
            return NextResponse.json({ message: "User with this email is not registered. Signup first" }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ status: 400 }, { message: "Error occured while logging the user", error })
    }
}