import crypto from "crypto";
import keys from "../config/keys";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(keys.secretKey)
        .digest("hex");
};
