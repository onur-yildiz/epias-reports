import {
  ChartConfig,
  CustomChartOptions,
  LineControllerChartOptions,
} from "chart.js";
import {
  ChartDataOptions,
  addTooltipLabelSuffix,
} from "../../utils/chartUtils";

const chartOptions = {
  scales: {
    y: {
      title: {
        text: "TL/MWh",
      },
      display: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Weighted Average Price",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          return addTooltipLabelSuffix(tooltipItem, "TL/MWh");
        },
      },
    },
  },
} as CustomChartOptions<"line", LineControllerChartOptions>;

const chartDataOptions: ChartDataOptions = {
  datasetLabels: ["Price"],
};

const labelPropName = "date";

const idmWapConfig: ChartConfig = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default idmWapConfig;
