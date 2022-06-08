import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";

enum RE { // Report Endpoints
  McpSmp = "mcpsmp",
  DayAheadMcp = "dayaheadmcp",
  Rtg = "realtimegeneration",
  DppOrg = "dpporganization",
  DppInjUnitName = "dppinjectionunitname",
  Dpp = "dpp",
  IntraDayWap = "intradayaof",
  IntraDaySummary = "intradaysummary",
  IntraDayVolSum = "intradayvolumesummary",
  Smp = "smp",
}

const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5275/reports/",
    prepareHeaders: (headers, { getState }) => {
      const rootState = getState() as RootState;

      if (rootState.auth.isAuthenticated)
        headers.set("Authorization", rootState.auth.user.token);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMcpSmp: builder.query<McpSmpData, DateInterval>({
      query: (q) =>
        `${RE.McpSmp}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
    getDayAheadMcp: builder.query<DayAheadMcpData, DateInterval>({
      query: (q) =>
        `${RE.DayAheadMcp}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
    getRtg: builder.query<RealtimeGenerationData, DateInterval>({
      query: (q) => `${RE.Rtg}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
    getDppOrganization: builder.query<DppOrganizationData, void>({
      query: () => RE.DppOrg,
    }),
    getDppInjectionUnitName: builder.query<DppInjectionUnitNameData, string>({
      query: (q) => `${RE.DppInjUnitName}?organizationEIC=${q}`,
    }),
    getDpp: builder.query<DppData, DppParams>({
      query: (q) => {
        const param3 = q.organizationEIC
          ? `&organizationEIC=${q.organizationEIC}`
          : "";
        const param4 = q.uevcbEIC ? `&injectionUnitName=${q.uevcbEIC}` : "";
        return `${RE.Dpp}?startDate=${q.startDate}&endDate=${q.endDate}${param3}${param4}`;
      },
    }),
    getIntraDayWap: builder.query<IntradayWapData, DateInterval>({
      query: (q) =>
        `${RE.IntraDayWap}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
    getIntraDaySummary: builder.query<IntradaySummaryData, DateInterval>({
      query: (q) =>
        `${RE.IntraDaySummary}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
    getIntraDayVolumeSummary: builder.query<
      IntradayVolumeSummaryData,
      DateIntervalPeriodic
    >({
      query: (q) =>
        `${RE.IntraDayVolSum}?startDate=${q.startDate}&endDate=${q.endDate}&period=${q.period}`,
    }),
    getSmp: builder.query<SmpData, DateInterval>({
      query: (q) => `${RE.Smp}?startDate=${q.startDate}&endDate=${q.endDate}`,
    }),
  }),
});

export const {
  useGetMcpSmpQuery: useGetMcpSmp,
  useGetDayAheadMcpQuery: useGetDayAheadMcp,
  useGetRtgQuery: useGetRtg,
  useGetDppOrganizationQuery: useGetDppOrganization,
  useGetDppInjectionUnitNameQuery: useGetDppInjectionUnitName,
  useGetDppQuery: useGetDpp,
  useGetIntraDayWapQuery: useGetIntraDayWap,
  useGetIntraDaySummaryQuery: useGetIntraDaySummary,
  useGetIntraDayVolumeSummaryQuery: useGetIntraDayVolumeSummary,
  useGetSmpQuery: useGetSmp,
} = reportApi;

export default reportApi;
