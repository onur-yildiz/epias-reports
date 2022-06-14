import {
  ChartDataOptions,
  addTooltipLabelSuffix,
} from "../../utils/chartUtils";
import { CustomChartOptions, LineControllerChartOptions } from "chart.js";

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

const damMcpConfig = {
  chartOptions,
  chartDataOptions,
};

export default damMcpConfig;
