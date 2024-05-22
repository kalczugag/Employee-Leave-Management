export interface StatusUnion {
    status?: "pending" | "approved" | "rejected";
}

export interface Stats {
    total: number;
    rejected: number;
    approved: number;
    pending: number;
}

export interface Leave extends Stats {
    _id?: string;
    _user?: string;
    leaveType: string;
    totalDay: number;
    startDate: string;
    endDate: string;
    status?: StatusUnion["status"];
}
