import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum SE { // Settings Endpoints
  ReportList = "reportlist",
}

const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5275/settings/",
  }),
  endpoints: (builder) => ({
    getReportList: builder.query<any, void>({
      query: () => `${SE.ReportList}`,
    }),
  }),
});

export const { useLazyGetReportListQuery: useLazyGetReportList } = settingsApi;

export default settingsApi;
