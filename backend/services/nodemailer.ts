import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { htmlToText } from "nodemailer-html-to-text";
import type { Options as EmailOptions } from "nodemailer/lib/mailer";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

console.log("Environment variables loaded.");
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "Loaded" : "Not Loaded");

export const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
    try {
        if (!process.env.SMTP_PASS) {
            throw new Error("SMTP_PASS environment variable is not set");
        }

        console.log("Creating transporter...");
        const transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            auth: {
                user: "apikey",
                pass: process.env.SMTP_PASS,
            },
        });

        transporter.use("compile", htmlToText());

        console.log("Transporter created. Sending email...");
        const info = await transporter.sendMail({
            from: emailOptions.from,
            to: emailOptions.to,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Failed to send email. Error:", err);
    }
};
