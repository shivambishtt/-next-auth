// import User from "@/models/user.model";
// import bcrypt from "bcrypt"

// interface SendEmailParams {
//     email: string,
//     emailType: "VERIFY" | "RESET",
//     userId: string,
// }

// export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
//     try {
//         const hashedToken = await bcrypt.hash(userId.toString(), 10)
//         if (emailType === "VERIFY") {
//             await User.findByIdAndUpdate({ userId }, {
//                 verifyToken: hashedToken,
//                 verifyTokenExpriy: Date.now() + 3600000 // 60 MINS
//             })
//         }
//         else if (emailType === "RESET") {
//             await User.findByIdAndUpdate({ userId }, {
//                 forgotPasswordToken: hashedToken,
//                 forgotPasswordTokenExpiry: Date.now() + 3600000 // 60 MINS
//             })
//         }

//     } catch (error: any) {
//         throw new Error("Error occured while sending the mail: " + error.message)
//     }

// }