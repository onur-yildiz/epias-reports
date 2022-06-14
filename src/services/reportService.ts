import baseApi from "./baseApiService";

enum RE { // Report Endpoints
  McpSmp = "reports/mcpsmp",
  DayAheadMcp = "reports/dayaheadmcp",
  Rtg = "reports/realtimegeneration",
  DppOrg = "reports/dpporganization",
  DppInjUnitName = "reports/dppinjectionunitname",
  Dpp = "reports/dpp",
  IntraDayWap = "reports/intradayaof",
  IntraDaySummary = "reports/intradaysummary",
  IntraDayVolSum = "reports/intradayvolumesummary",
  Smp = "reports/smp",
  Reports = "/reports/all",
  UpdateReportRoles = "reports/updateroles",
  UpdateReportIsActive = "reports/updateisactive",
  ReportListingInfo = "reports/listinginfo",
}

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMcpSmp: builder.query<McpSmpData, DateInterval>({
      query: (q) =>
        `${RE.McpSmp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getDayAheadMcp: builder.query<DayAheadMcpData, DateInterval>({
      query: (q) =>
        `${RE.DayAheadMcp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getRtg: builder.query<RealtimeGenerationData, DateInterval>({
      query: (q) => `${RE.Rtg}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getDppOrganization: builder.query<DppOrganizationData, void>({
      query: () => RE.DppOrg,
      providesTags: ["auth"],
    }),
    getDppInjectionUnitName: builder.query<DppInjectionUnitNameData, string>({
      query: (q) => `${RE.DppInjUnitName}?organizationEIC=${q}`,
      providesTags: ["auth"],
    }),
    getDpp: builder.query<DppData, DppParams>({
      query: (q) => {
        const param3 = q.organizationEIC
          ? `&organizationEIC=${q.organizationEIC}`
          : "";
        const param4 = q.uevcbEIC ? `&injectionUnitName=${q.uevcbEIC}` : "";
        return `${RE.Dpp}?startDate=${q.startDate}&endDate=${q.endDate}${param3}${param4}`;
      },
      providesTags: ["auth"],
    }),
    getIntraDayWap: builder.query<IntradayWapData, DateInterval>({
      query: (q) =>
        `${RE.IntraDayWap}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getIntraDaySummary: builder.query<IntradaySummaryData, DateInterval>({
      query: (q) =>
        `${RE.IntraDaySummary}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getIntraDayVolumeSummary: builder.query<
      IntradayVolumeSummaryData,
      DateIntervalPeriodic
    >({
      query: (q) =>
        `${RE.IntraDayVolSum}?startDate=${q.startDate}&endDate=${q.endDate}&period=${q.period}`,
      providesTags: ["auth"],
    }),
    getSmp: builder.query<SmpData, DateInterval>({
      query: (q) => `${RE.Smp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      providesTags: ["auth"],
    }),
    getReportListingInfo: builder.query<ReportHierarchyItem[], void>({
      query: () => RE.ReportListingInfo,
      providesTags: ["auth", "report-status"],
    }),
    updateReportRoles: builder.mutation<void, ReportRoleParams>({
      query: (params) => ({
        url: RE.UpdateReportRoles,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["report-status"],
    }),
    getReports: builder.query<ReportRoute[], void>({
      query: () => RE.Reports,
      providesTags: ["auth"],
    }),
    updateReportIsActive: builder.mutation<void, ReportIsActiveParams>({
      query: (params) => ({
        url: RE.UpdateReportIsActive,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["report-status"],
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
  useGetReportsQuery: useGetReports,
  useUpdateReportRolesMutation: useLazyUpdateReportRoles,
  useGetReportListingInfoQuery: useGetReportListingInfo,
  useUpdateReportIsActiveMutation: useUpdateReportIsActive,
} = reportApi;

export default reportApi;
