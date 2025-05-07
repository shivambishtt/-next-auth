import nodemailer from "nodemailer"

interface SendEmailParams {
    email: string,
    emailType: "VERIFY" | "RESET",
    userId: string,
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
    try {
        // config mail for usage
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 465,
            secure: true,
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        const mail = {
            from: 'shivamdev',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: "<b>Hello world?</b>",
        }
        const mailResponse = await transporter.sendMail(mail)
        return mailResponse
    } catch (error: any) {
        throw new Error("Error occured while sending the mail: " + error.message)
    }

}