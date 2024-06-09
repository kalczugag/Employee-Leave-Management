import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Leave, StatusUnion, Stats } from "@typ/leave";

interface optionsProps {
    userId?: string;
    selectQuery?: string;
    page?: number;
    pageSize?: number;
    status?: StatusUnion;
    stats?: boolean;
}

interface ResultLeaves {
    leaves: Leave[];
    totalLeavesCount: number;
}

type ResponseData = ResultLeaves | Stats;

export const leaveApi = createApi({
    reducerPath: "leave",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol + "//" + window.location.host + "/api",
    }),
    tagTypes: ["Leaves"],
    endpoints: (builder) => ({
        getLeaves: builder.query<ResponseData, optionsProps | void>({
            query: (options) => ({
                url: "/leaves",
                method: "GET",
                params: {
                    userId: options?.userId,
                    fields: options?.selectQuery,
                    page: options?.page,
                    pageSize: options?.pageSize,
                    status: options?.status,
                    stats: options?.stats,
                },
            }),
            providesTags: (result) =>
                result && "leaves" in result
                    ? result.leaves.map((leave) => ({
                          type: "Leaves",
                          id: leave._id,
                      }))
                    : [{ type: "Leaves", id: "LIST" }],
        }),

        getLeave: builder.query<Leave, string>({
            query: (id) => ({
                url: `/leaves/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Leaves", id: id }],
        }),

        addLeave: builder.mutation<Leave, Leave>({
            query: (values) => ({
                url: "/leaves",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result) => [{ type: "Leaves", id: result?._id }],
        }),

        editLeave: builder.mutation<Leave, Leave>({
            query: (values) => ({
                url: `/leaves/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, leave) => [
                { type: "Leaves", id: leave._id },
            ],
        }),

        deleteLeave: builder.mutation<Leave, string>({
            query: (id) => ({
                url: `/leaves/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result) => [{ type: "Leaves", id: result?._id }],
        }),
    }),
});

export const {
    useGetLeavesQuery,
    useGetLeaveQuery,
    useAddLeaveMutation,
    useEditLeaveMutation,
    useDeleteLeaveMutation,
} = leaveApi;
