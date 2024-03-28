interface user {
    _id?: string;
    img?: string;
    departmentId?: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender?: "Male" | "Female";
    mobile?: string;
    address?: string;
    roles: "staff" | "hod" | "admin";
    authentication?: {
        password: string;
        salt: string;
        sessionToken: string;
    };
}
