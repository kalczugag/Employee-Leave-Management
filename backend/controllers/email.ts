import express from "express";

import { sendEmail } from "../services/sgEmail";
import { dmEmail } from "../emailTemplate/dmEmail";

export const sendMessage = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { message, subject, sender, recipient } = req.body;

        const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
        const packedData = { message, sender, recipient, date: utc };

        if (!message || !recipient || !sender) {
            return res.sendStatus(400);
        }

        const emailOptions = {
            from: `Employee Leave Management - ${sender} <s89779320@gmail.com>`,
            to: recipient,
            subject: `Employee Leave Management: ${subject || "New Message"}`,
            html: dmEmail(packedData),
        };

        sendEmail(emailOptions).catch((err: any) => {
            console.error("Error sending email:", err);
        });

        return res.status(200).json({ msg: "Message sent" });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
