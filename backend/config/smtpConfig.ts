import dotenv from "dotenv";

dotenv.config({ path: [".env.local", ".env"] });

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
