import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Department } from "@typ/department";

interface GetDepartmentsParams {
    fields?: string;
    page?: number;
    pageSize?: number;
}

interface ResultDepartments {
    departments: Department[];
    totalDepartmentsCount: number;
}

export const departmentApi = createApi({
    reducerPath: "department",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol + "//" + window.location.host + "/api",
    }),
    tagTypes: ["Departments"],
    endpoints: (builder) => ({
        getAllDepartments: builder.query<
            ResultDepartments,
            GetDepartmentsParams | void
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
                    url: "/departments",
                    method: "GET",
                    params: queryParams,
                };
            },
            providesTags: (result) =>
                result && "departments" in result
                    ? result.departments.map((dep) => ({
                          type: "Departments",
                          id: dep._id,
                      }))
                    : [{ type: "Departments", id: "LIST" }],
        }),

        getDepartment: builder.query<Department, string>({
            query: (id) => ({
                url: `/departments/${id}`,
                method: "GET",
            }),
        }),

        addDepartment: builder.mutation<Department, Department>({
            query: (values) => ({
                url: "/departments",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, dep) => [
                { type: "Departments", id: dep._id },
            ],
        }),

        editDepartment: builder.mutation<Department, Department>({
            query: (values) => ({
                url: `/departments/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, dep) => [
                { type: "Departments", id: dep._id },
            ],
        }),

        deleteDepartment: builder.mutation<string, string>({
            query: (id) => ({
                url: `/departments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Departments", id: id },
            ],
        }),
    }),
});

export const {
    useGetAllDepartmentsQuery,
    useGetDepartmentQuery,
    useAddDepartmentMutation,
    useDeleteDepartmentMutation,
    useEditDepartmentMutation,
} = departmentApi;
