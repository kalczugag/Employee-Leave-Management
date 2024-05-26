interface IKeys {
    [key: string]: string;
}

let keys: IKeys;

try {
    if (process.env.NODE_ENV === "production") {
        keys = require("./prod").default;
    } else {
        keys = require("./dev").default;
    }
} catch (err: unknown) {
    console.error("Error loading configuration:", err);
    keys = {};
}

export default keys;
