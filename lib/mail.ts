export async function sendMail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html?: string;
}) {
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Dumcel Team" <${process.env.EMAIL_ID}>`,
            to,
            subject,
            html: html,
        });

        console.log("Email sent:", info.messageId);
        return info;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to send email"
        );
    }
}
