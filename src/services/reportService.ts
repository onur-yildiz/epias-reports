import baseApi from "./baseApiService";

enum RE { // Report Endpoints
  McpSmp = "reports/mcp-smp",
  DayAheadMcp = "reports/dam-mcp",
  Rtg = "reports/rtg",
  DppOrg = "reports/dpporg",
  DppInjUnitName = "reports/dppiun",
  Dpp = "reports/fdpp",
  IntraDayWap = "reports/idm-wap",
  IntraDaySummary = "reports/idm-sum",
  IntraDayMatchingQuantity = "reports/idm-mq",
  IntraDayVolSum = "reports/idm-vs",
  Smp = "reports/bpm-smp",
  Reports = "/reports",
  ReportListingInfo = "appconfig/report-listing-info",
}

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportListingInfo: builder.query<ReportHierarchyItem[], void>({
      query: () => RE.ReportListingInfo,
      providesTags: ["auth", "report-status"],
    }),
    getReports: builder.query<ReportRoute[], void>({
      query: () => RE.Reports,
      providesTags: ["auth", "report-status"],
    }),
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
    getIntraDayMatchingQuantity: builder.query<
      IntradaySummaryData,
      DateInterval
    >({
      query: (q) =>
        `${RE.IntraDayMatchingQuantity}?startDate=${q.startDate}&endDate=${q.endDate}`,
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
    updateReportRoles: builder.mutation<
      void,
      ReportUpdateParams<ReportUpdateRolesBody>
    >({
      query: (params: ReportUpdateParams<ReportUpdateRolesBody>) => ({
        url: `${RE.Reports}/${params.key}/roles`,
        method: "PATCH",
        body: params.body,
      }),
      invalidatesTags: ["report-status"],
    }),
    updateReportIsActive: builder.mutation<
      void,
      ReportUpdateParams<ReportUpdateIsActiveBody>
    >({
      query: (params: ReportUpdateParams<ReportUpdateIsActiveBody>) => ({
        url: `${RE.Reports}/${params.key}/is-active`,
        method: "PATCH",
        body: params.body,
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
  useGetIntraDayMatchingQuantityQuery: useGetIntraDayMatchingQuantity,
  useGetIntraDayVolumeSummaryQuery: useGetIntraDayVolumeSummary,
  useGetSmpQuery: useGetSmp,
  useGetReportsQuery: useGetReports,
  useUpdateReportRolesMutation: useLazyUpdateReportRoles,
  useGetReportListingInfoQuery: useGetReportListingInfo,
  useUpdateReportIsActiveMutation: useUpdateReportIsActive,
} = reportApi;

export default reportApi;
