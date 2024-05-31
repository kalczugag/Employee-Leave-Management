import { config } from "dotenv";
import { sendEmail } from "../services/nodemailer";

config();
config({ path: [".env.local", ".env"] });

const emailOptions = {
    from: `test <${process.env.SMTP_USER}>`,
    to: "kalczugag@gmail.com",
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: "<p><b>Hello</b> to myself!</p>",
};

console.log(process.env.SMTP_USER);

export const smtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
};

sendEmail(emailOptions, smtpConfig).catch((err: any) => {
    console.error("Error sending email:", err);
});
