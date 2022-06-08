import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum SE { // Settings Endpoints
  ReportList = "reportlist",
}

const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/settings/",
  }),
  endpoints: (builder) => ({
    getReportList: builder.query<any, void>({
      query: () => `${SE.ReportList}`,
    }),
  }),
});

export const { useLazyGetReportListQuery: useLazyGetReportList } = settingsApi;

export default settingsApi;
