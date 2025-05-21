import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json()
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 500 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const verifyCode = Math.floor(100000 + Math.random() * 900000)
        const createUser = await User.create({
            username,
            email,
            password: hashedPassword,
            verifyCode
        })
        const verifyemail = await sendVerificationEmail(email, username, verifyCode)
        if (!verifyemail.success) {
            return NextResponse.json({ message: "Error occured while sending the email", success: false, status: 500 })
        }

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            createUser
        })
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}