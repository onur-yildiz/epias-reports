import {
  ChartConfig,
  CustomChartOptions,
  LineControllerChartOptions,
} from "chart.js";
import {
  ChartDataOptions,
  addTooltipLabelSuffix,
  defaultDateLabelCallback,
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
        title: defaultDateLabelCallback,
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

const idmWapConfig: ChartConfig<"line", LineControllerChartOptions> = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default idmWapConfig;
