import baseApi from "./baseApiService";

enum RE { // Report Endpoints
  McpSmp = "reports/mcp-smp",
  DayAheadMcp = "reports/dam-mcp",
  Rtg = "reports/rtg",
  DppOrg = "reports/dpporg",
  DppInjUnitName = "reports/dppiun",
  Dpp = "reports/dpp",
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
      transformResponse: (res: ApiResponse<ReportHierarchyItem[]>) => res.value,
      providesTags: ["auth", "report-status"],
    }),

    getReports: builder.query<ReportRoute[], void>({
      query: () => RE.Reports,
      transformResponse: (res: ApiResponse<ReportRoute[]>) => res.value,
      providesTags: ["auth", "report-status"],
    }),

    getMcpSmp: builder.query<McpSmpData, DateInterval>({
      query: (q) =>
        `${RE.McpSmp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<McpSmpData>) => res.value,
      providesTags: ["auth"],
    }),

    getDayAheadMcp: builder.query<DayAheadMcpData, DateInterval>({
      query: (q) =>
        `${RE.DayAheadMcp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<DayAheadMcpData>) => res.value,
      providesTags: ["auth"],
    }),

    getRtg: builder.query<RealtimeGenerationData, DateInterval>({
      query: (q) => `${RE.Rtg}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<RealtimeGenerationData>) =>
        res.value,
      providesTags: ["auth"],
    }),

    getDppOrganization: builder.query<DppOrganizationData, void>({
      query: () => RE.DppOrg,
      transformResponse: (res: ApiResponse<DppOrganizationData>) => res.value,
      providesTags: ["auth"],
    }),

    getDppInjectionUnitName: builder.query<DppInjectionUnitNameData, string>({
      query: (q) => `${RE.DppInjUnitName}?organizationEIC=${q}`,
      transformResponse: (res: ApiResponse<DppInjectionUnitNameData>) =>
        res.value,
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
      transformResponse: (res: ApiResponse<DppData>) => res.value,
      providesTags: ["auth"],
    }),

    getIntraDayWap: builder.query<IntradayWapData, DateInterval>({
      query: (q) =>
        `${RE.IntraDayWap}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<IntradayWapData>) => res.value,
      providesTags: ["auth"],
    }),

    getIntraDaySummary: builder.query<IntradaySummaryData, DateInterval>({
      query: (q) =>
        `${RE.IntraDaySummary}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<IntradaySummaryData>) => res.value,
      providesTags: ["auth"],
    }),

    getIntraDayMatchingQuantity: builder.query<
      IntradaySummaryData,
      DateInterval
    >({
      query: (q) =>
        `${RE.IntraDayMatchingQuantity}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<IntradaySummaryData>) => res.value,
      providesTags: ["auth"],
    }),

    getIntraDayVolumeSummary: builder.query<
      IntradayVolumeSummaryData,
      DateIntervalPeriodic
    >({
      query: (q) =>
        `${RE.IntraDayVolSum}?startDate=${q.startDate}&endDate=${q.endDate}&period=${q.period}`,
      transformResponse: (res: ApiResponse<IntradayVolumeSummaryData>) =>
        res.value,
      providesTags: ["auth"],
    }),

    getSmp: builder.query<SmpData, DateInterval>({
      query: (q) => `${RE.Smp}?startDate=${q.startDate}&endDate=${q.endDate}`,
      transformResponse: (res: ApiResponse<SmpData>) => res.value,
      providesTags: ["auth"],
    }),

    updateReportRoles: builder.mutation<
      void,
      ReportUpdateParams<UpdateRolesBody>
    >({
      query: (params) => ({
        url: `${RE.Reports}/${params.key}/roles`,
        method: "PATCH",
        body: params.body,
      }),
      invalidatesTags: ["report-status"],
    }),

    updateReportIsActive: builder.mutation<
      void,
      ReportUpdateParams<UpdateIsActiveBody>
    >({
      query: (params) => ({
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
