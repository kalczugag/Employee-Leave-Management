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
        editDepartment: builder.mutation<Department, Department>({
            query: (values: Department) => ({
                url: `/departments/${values._id}`,
                method: "PATCH",
                body: values,
            }),
        }),
    }),
});

export const { useGetAllDepartmentsQuery } = departmentApi;
export { departmentApi };
