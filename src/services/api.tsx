import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, { start: number; limit: number }>({
      query: (arg: { start: number; limit: number }) =>
        `/users/?_start=${arg.start}&_limit=${arg.limit}`,
    }),
  }),
});

export const { useLazyGetUsersQuery } = Api;
