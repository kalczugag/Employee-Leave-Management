import nodemailer from "nodemailer";
import type { EmailOptions, SMTPConfig } from "@typ/nodemailer";

export const sendEmail = async (
    emailOptions: EmailOptions,
    smtpConfig: SMTPConfig
): Promise<void> => {
    try {
        let transporter = nodemailer.createTransport(smtpConfig);

        let message: nodemailer.SendMailOptions = {
            from: emailOptions.from,
            to: emailOptions.to,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        };

        const info = await transporter.sendMail(message);

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Failed to send email. " + (err as Error).message);
    }
};
