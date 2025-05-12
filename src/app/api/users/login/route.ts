import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import jwt from "jsonwebtoken"

connectDB()

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

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }
}