import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/utils/mailer";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = request.json()
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 500 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        // return createUser



    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}