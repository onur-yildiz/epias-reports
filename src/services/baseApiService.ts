import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user.token;

      if (token.length > 0) headers.set("Authorization", token);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  tagTypes: ["auth", "report-status", "user-status"],
  endpoints: () => ({}),
});

export default baseApi;
