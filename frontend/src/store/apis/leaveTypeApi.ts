import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LeaveType } from "@typ/leaveType";

interface GetLeaveTypesParams {
    fields?: string;
    page?: number;
    pageSize?: number;
}

interface ResultLeaveTypes {
    leaveTypes: LeaveType[];
    totalLeaveTypesCount: number;
}

export const leaveTypeApi = createApi({
    reducerPath: "leaveType",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol + "//" + window.location.host + "/api",
    }),
    tagTypes: ["LeaveTypes"],
    endpoints: (builder) => ({
        getLeaveTypes: builder.query<
            ResultLeaveTypes,
            GetLeaveTypesParams | void
        >({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.fields) {
                    queryParams.fields = params.fields;
                }
                if (params?.page !== undefined) {
                    queryParams.page = params.page.toString();
                }
                if (params?.pageSize !== undefined) {
                    queryParams.pageSize = params.pageSize.toString();
                }
                return {
                    url: "/leave-types",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result && "leaveTypes" in result
                    ? result.leaveTypes.map((lt) => ({
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
