import connectDB from "@/db/dbConnect";
import User from "@/models/user.model";

export async function POST(request: Request) {
    await connectDB()
    try {
        const { username, verifyCode } = await request.json()
        const decodedUsername = decodeURIComponent(username)

        const user = await User.findOne({ username: decodedUsername })
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User with this username does not exists"
                },
                {
                    status: 404
                }
            )
        }
        const isCodeValid = user.verifyCode === verifyCode
        const isCodeExpired = new Date(user.verifyCodeExpiry) < new Date()

        if (isCodeValid && !isCodeExpired) {
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {
                    status: 200
                }
            )
        }
        else if (isCodeExpired) {
            return Response.json(
                {
                    success: false,
                    message: "Verification code is expired"
                },
                {
                    status: 400
                }
            )
        }
        else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect verification code"
                },
                {
                    status: 402
                }
            )
        }

    } catch (error) {
        console.error("Error occured while verifying the code", error);
        return Response.json(
            {
                success: false,
                message: "Error occured while verifying the code"
            },
            {
                status: 500
            }
        )
    }
}
