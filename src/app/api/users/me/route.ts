import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

connectDB()

export async function POST(request: NextRequest){
    
}