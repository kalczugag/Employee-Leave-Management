import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    endpoints(builder) {
        return {
            fetchUser: builder.query<user, void>({
                query: () => {
                    return {
                        url: "/auth/current_user",
                        method: "GET",
                    };
                },
            }),
            login: builder.mutation({
                query: (args: { email: string; password: string }) => {
                    return {
                        url: "/auth/login",
                        method: "POST",
                        body: args,
                    };
                },
            }),
            register: builder.mutation({
                query: (args: user) => {
                    return {
                        url: "/auth/register",
                        method: "POST",
                        body: args,
                    };
                },
            }),
        };
    },
});

export const { useFetchUserQuery, useLoginMutation, useRegisterMutation } =
    userApi;
export { userApi };
