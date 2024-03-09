interface user {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    mobile: number;
    address: string;
    roles: string[];
    authentication?: object;
}
