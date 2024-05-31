export interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export interface SMTPConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}
