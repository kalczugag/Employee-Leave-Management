import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Department } from "@typ/department";

const departmentApi = createApi({
    reducerPath: "department",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    tagTypes: ["Departments"],
    endpoints: (builder) => ({
        getAllDepartments: builder.query<Department[], string | void>({
            query: (selectQuery) => {
                const params: Record<string, string> = {};
                if (selectQuery) {
                    params.fields = selectQuery;
                }
                return {
                    url: "/departments",
                    method: "GET",
                    params,
                };
            },

            providesTags: (result) =>
                result
                    ? result.map((dep) => ({
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
export { departmentApi };
