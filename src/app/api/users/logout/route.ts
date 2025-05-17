import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export default async function POST(request: NextRequest) {
    try {
       const { username, password } = await request.json()
    if (!username || !password) {
        return NextResponse.json({ message: "Both fields are required" }, { status: 400 })
    }
    const user = await User.findOne({ username })
    if (!user) {
        return NextResponse.json({ message: "User with this username is not registered" }, { status: 400 })
    }
    const response = NextResponse.json({ message: "test" })
    const accessToken = user.accessToken
    const refreshToken = user.refreshToken
    response.cookies.delete({ accessToken, refreshToken }) 
    } catch (error) {
        
    }
    
}