import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/reservations.json",
  prepareHeaders: headers => {
    headers.set("Accept", "application/json");

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Role", "Role", "Profile", "Permission", "Notification"],
  endpoints: builder => ({}),
});
