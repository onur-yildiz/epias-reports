const reportHierarchy: ReportHierarchyItem[] = [
  {
    order: 0,
    folderName: [
      {
        lang: "en",
        short: "Electricity Markets",
        long: "Electricity Markets",
      },
    ],
    children: [
      {
        order: 0,
        folderName: [
          {
            lang: "en",
            short: "DAM",
            long: "Day Ahead Markets",
          },
        ],
        children: [
          {
            order: 0,
            reportKey: "dam-mcp",
            reportName: [
              {
                lang: "en",
                short: "MCP",
                long: "Market Clearing Price",
              },
            ],
            path: "reports/electricity-markets/dam/mcp",
          },
        ],
      },
      {
        order: 1,
        folderName: [
          {
            lang: "en",
            short: "IDM",
            long: "Intra-Day Markets",
          },
        ],
        children: [
          {
            order: 0,
            reportKey: "idm-wap",
            reportName: [
              {
                lang: "en",
                short: "IDM WAP",
                long: "IDM Weighted Average Price",
              },
            ],
            path: "reports/electricity-markets/idm/wap",
          },
          {
            order: 1,
            reportKey: "idm-mq",
            reportName: [
              {
                lang: "en",
                short: "IDM MQ",
                long: "IDM Matching Quantity",
              },
            ],
            path: "reports/electricity-markets/idm/mq",
          },
          {
            order: 2,
            reportKey: "idm-sum",
            reportName: [
              {
                lang: "en",
                short: "IDM Summary",
                long: "IDM Summary",
              },
            ],
            path: "reports/electricity-markets/idm/sum",
          },
        ],
      },
      {
        order: 2,
        folderName: [
          {
            lang: "en",
            short: "BPM",
            long: "Balancing Power Markets",
          },
        ],
        children: [
          {
            order: 0,
            reportKey: "bpm-smp",
            reportName: [
              {
                lang: "en",
                short: "SMP",
                long: "System Marginal Price",
              },
            ],
            path: "reports/electricity-markets/bpm/smp",
          },
        ],
      },
    ],
  },
  {
    order: 1,
    folderName: [
      {
        lang: "en",
        short: "Electricity Generation",
        long: "Electricity Generation",
      },
    ],
    children: [
      {
        order: 0,
        folderName: [
          {
            lang: "en",
            short: "Planning",
            long: "Planning",
          },
        ],
        children: [
          {
            order: 0,
            reportKey: "fdpp",
            reportName: [
              {
                lang: "en",
                short: "FDPP",
                long: "Final Daily Production Program",
              },
            ],
            path: "reports/electricity-geeration/planning/fdpp",
          },
        ],
      },
      {
        order: 1,
        folderName: [
          {
            lang: "en",
            short: "Ex-post Generation",
            long: "Ex-post Generation",
          },
        ],
        children: [
          {
            order: 0,
            reportKey: "rtg",
            reportName: [
              {
                lang: "en",
                short: "RTG",
                long: "Real-Time Generation",
              },
            ],
            path: "reports/electricity-generation/ex-post-generation/rtg",
          },
        ],
      },
    ],
  },
  {
    order: 99,
    folderName: [
      {
        lang: "en",
        short: "Other",
        long: "Other",
      },
    ],
    children: [
      {
        order: 0,
        reportKey: "dpporg",
        reportName: [
          {
            lang: "en",
            short: "DPP Org",
            long: "DPP Organizations",
          },
        ],
        path: "reports/other/dpp-org",
      },
      {
        order: 1,
        reportKey: "dppiun",
        reportName: [
          {
            lang: "en",
            short: "DPP IUN",
            long: "DPP Injection Unit Names",
          },
        ],
        path: "reports/other/dpp-iun",
      },
    ],
  },
];

export default reportHierarchy;
