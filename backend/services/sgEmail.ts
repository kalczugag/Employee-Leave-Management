import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export const sendEmail = async (
    emailOptions: sgMail.MailDataRequired
): Promise<void> => {
    try {
        if (!process.env.SMTP_PASS) {
            throw new Error("SMTP_PASS environment variable is not set");
        }

        sgMail.setApiKey(process.env.SMTP_PASS);

        sgMail.send(emailOptions).then(
            (ss) => {
                console.log(ss);
            },
            (error) => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body);
                }
            }
        );

        console.log("Message sent");
    } catch (err) {
        console.error("Failed to send email. Error:", err);
    }
};
