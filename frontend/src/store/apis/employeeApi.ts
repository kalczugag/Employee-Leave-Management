import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetEmployeeParams {
    id: string;
    selectQuery?: string;
}

interface GetEmployeesByIdsParams {
    ids: string[];
    selectQuery?: string;
}

interface GetEmployeesParams {
    byRole?: string;
    page?: number;
    pageSize?: number;
}

interface ResultEmployees {
    users: user[];
    totalUsersCount: number;
}

export const employeeApi = createApi({
    reducerPath: "employee",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol + "//" + window.location.host + "/api",
    }),
    tagTypes: ["Employees"],
    endpoints: (builder) => ({
        getEmployees: builder.query<ResultEmployees, GetEmployeesParams | void>(
            {
                query: (params = {}) => {
                    const queryParams: Record<string, string> = {};
                    if (params?.byRole) {
                        queryParams.byRole = params.byRole;
                    }
                    if (params?.page !== undefined) {
                        queryParams.page = params.page.toString();
                    }
                    if (params?.pageSize !== undefined) {
                        queryParams.pageSize = params.pageSize.toString();
                    }
                    return {
                        url: "/users",
                        method: "GET",
                        params: queryParams,
                    };
                },
                providesTags: (result) =>
                    result && "users" in result
                        ? result.users.map((user) => ({
                              type: "Employees",
                              id: user._id,
                          }))
                        : [{ type: "Employees", id: "LIST" }],
            }
        ),

        getEmployee: builder.query<user, GetEmployeeParams>({
            query: ({ id, selectQuery }) => {
                const params: Record<string, string> = {};
                if (selectQuery) {
                    params.fields = selectQuery;
                }
                return {
                    url: `/users/${id}`,
                    method: "GET",
                    params,
                };
            },
            providesTags: (result, error, { id }) => [
                { type: "Employees", id: id },
            ],
        }),

        getEmployeesByIds: builder.query<user[], GetEmployeesByIdsParams>({
            query: ({ ids, selectQuery }) => ({
                url: "/users/byIds",
                method: "GET",
                params: {
                    ids,
                    fields: selectQuery,
                },
            }),
            providesTags: (result, error) =>
                result
                    ? result.map((user) => ({
                          type: "Employees",
                          id: user._id,
                      }))
                    : [{ type: "Employees", id: "LIST" }],
        }),

        addEmployee: builder.mutation<user, user>({
            query: (values) => ({
                url: "/users",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, user) => [
                { type: "Employees", id: user._id },
            ],
        }),

        editEmployee: builder.mutation<user, user>({
            query: (values) => ({
                url: `/users/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, user) => [
                { type: "Employees", id: user._id },
            ],
        }),

        deleteEmployee: builder.mutation<user, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result) => [
                { type: "Employees", id: result?._id },
            ],
        }),
    }),
});

export const {
    useGetEmployeesQuery,
    useGetEmployeeQuery,
    useGetEmployeesByIdsQuery,
    useAddEmployeeMutation,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;
