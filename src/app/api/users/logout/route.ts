import connectDB from "@/db/dbConnect"
import { NextResponse } from "next/server"

connectDB()
export async function GET() {
    try {
        const response = NextResponse.json({ message: "User logged out successfully", success: true }, { status: 200 })
        const options = {
            httpOnly: true,
            secure: true
        }
        response.cookies.set("accessToken", "", options)
        response.cookies.set("refreshToken", "", options)

        return response
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 400 })

    }

}