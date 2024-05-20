import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LeaveType } from "@typ/leaveType";

export const leaveTypeApi = createApi({
    reducerPath: "leaveType",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    tagTypes: ["LeaveTypes"],
    endpoints: (builder) => ({
        getLeaveTypes: builder.query<LeaveType[], string | void>({
            query: (selectQuery) => {
                const params: Record<string, string> = {};
                if (selectQuery) {
                    params.fields = selectQuery;
                }
                return {
                    url: "/leave-types",
                    method: "GET",
                    params,
                };
            },
            providesTags: (result) =>
                result
                    ? result.map((lt) => ({
                          type: "LeaveTypes",
                          id: lt._id,
                      }))
                    : [{ type: "LeaveTypes", id: "LIST" }],
        }),

        getLeaveType: builder.query<LeaveType, string>({
            query: (id) => ({
                url: `/leave-types/${id}`,
                method: "GET",
            }),
        }),

        addLeaveType: builder.mutation<LeaveType, LeaveType>({
            query: (values) => ({
                url: "/leave-types",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, lt) => [
                { type: "LeaveTypes", id: lt._id },
            ],
        }),

        editLeaveType: builder.mutation<LeaveType, LeaveType>({
            query: (values) => ({
                url: `/leave-types/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, lt) => [
                { type: "LeaveTypes", id: lt._id },
            ],
        }),

        deleteLeaveType: builder.mutation<string, string>({
            query: (id) => ({
                url: `/leave-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "LeaveTypes", id: id },
            ],
        }),
    }),
});

export const {
    useGetLeaveTypesQuery,
    useGetLeaveTypeQuery,
    useAddLeaveTypeMutation,
    useEditLeaveTypeMutation,
    useDeleteLeaveTypeMutation,
} = leaveTypeApi;
