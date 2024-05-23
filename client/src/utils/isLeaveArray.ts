import type { Leave } from "@typ/leave";

export const isLeaveArray = (data: any): data is Array<Leave> => {
    return Array.isArray(data);
};
