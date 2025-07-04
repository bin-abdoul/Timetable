import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = "https://timetableapi-b4hq.onrender.com";
// const backendUrl = "http://localhost:3000";



const baseQuery = fetchBaseQuery({
  baseUrl: backendUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Subject"],
  endpoints: (builder) => ({
    index: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});