import { resend } from "@/utils/resend"
import VerificationEmail from "@/emails/VerificationEmail"


export async function sendVerificationEmail(email: string, username: string, verifyCode?: number) {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Email',
            react: VerificationEmail({ username, verifyCode }),
        });
        return { success: true, message: "Verification email sent successfully" }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "Failed to send verification email" }
    }
}