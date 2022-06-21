import {
  ChartConfig,
  CustomChartOptions,
  LineControllerChartOptions,
} from "chart.js";

import { ChartDataOptions } from "../../utils/chartUtils";
import format from "date-fns/format";
import { parse } from "date-fns";

const chartOptions = {
  scales: {
    y: {
      title: {
        text: "MWh",
      },
      display: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Matching Quantity",
    },
    tooltip: {
      callbacks: {
        title: (tooltipItem: any) => {
          const label: string = tooltipItem[0].label;
          let date = label.slice(2).split("-")[0];
          date = format(
            parse(date, "yyMMddHH", new Date()),
            "Pp" // TODO get timezone
          );
          return `${label} - ${date}`;
        },
        label: (tooltipItem: any) => {
          const d = tooltipItem.dataset;
          return `${d.label}: ${d.data[tooltipItem.dataIndex]} MWh`;
        },
      },
    },
  },
} as CustomChartOptions<"line", LineControllerChartOptions>;

const chartDataOptions: ChartDataOptions = {
  valuePropNames: ["volume"],
  datasetLabels: ["Volume"],
};

const labelPropName = "contract";

const idmMqConfig: ChartConfig<"line", LineControllerChartOptions> = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default idmMqConfig;
