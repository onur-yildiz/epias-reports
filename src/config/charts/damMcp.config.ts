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
  plugins: {
    title: {
      display: true,
      text: "Market Clearing Price",
    },
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        title: defaultDateLabelCallback,
        label: (tooltipItem: any) => {
          return addTooltipLabelSuffix(
            tooltipItem,
            `${tooltipItem.dataset.label}/MWh`
          );
        },
      },
    },
  },
} as CustomChartOptions<"line", LineControllerChartOptions>;

const chartDataOptions: ChartDataOptions = {
  datasetLabels: ["TL", "USD", "EUR"],
};

const labelPropName = "date";

const damMcpConfig: ChartConfig<"line", LineControllerChartOptions> = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default damMcpConfig;
