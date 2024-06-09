import type { Leave, Stats } from "@typ/leave";

class LeavesType {
    static isResultLeaves(
        data: any
    ): data is { leaves: Leave[]; totalLeavesCount: number } {
        return data && Array.isArray(data.leaves);
    }

    static isLeaveArray(data: any): data is Array<Leave> {
        return Array.isArray(data);
    }

    static isStatsData(data: any): data is Stats {
        return (
            data &&
            typeof data === "object" &&
            !Array.isArray(data) &&
            "total" in data
        );
    }
}

export default LeavesType;
