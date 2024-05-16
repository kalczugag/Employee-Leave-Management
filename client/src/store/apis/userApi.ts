import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    endpoints(builder) {
        return {
            fetchUser: builder.query({
                query: () => {
                    return {
                        url: "/auth/current_user",
                        method: "GET",
                    };
                },
            }),
        };
    },
});

export const { useFetchUserQuery } = userApi;
export { userApi };
