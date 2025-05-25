import connectDB from "@/db/dbConnect";
import { getDataToken } from "@/helpers/fetchDataToken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request: NextRequest) {
    const userId = await getDataToken(request)
    const user = User.findOne({ _id: userId }).select("-password")
    if (!user) {
        return NextResponse.json({ message: "Invalid credentials", success: false, data: user }, { status: 400 })
    }
}