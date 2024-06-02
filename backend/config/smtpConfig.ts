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

export const smtpConfig = {
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
    },
};

// sendEmail(emailOptions, smtpConfig).catch((err: any) => {
//     console.error("Error sending email:", err);
// });
