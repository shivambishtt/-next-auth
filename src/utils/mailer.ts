import nodemailer from "nodemailer"

export const sendEmail = async ({ email, emailType, userId }): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        const mailOptions = {
            from: 'shivam@shivamdev',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: "<b>Hello world?</b>",
        }
    } catch (error) {

    }

}