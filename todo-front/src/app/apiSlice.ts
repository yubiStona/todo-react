import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:"http://localhost:3000/api",
    credentials:"include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
    
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
      },
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Tasks'],
    endpoints:()=>({})
})