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
      stacked: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Final Daily Production Program",
    },
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem: any) => {
          return addTooltipLabelSuffix(tooltipItem, "MWh");
        },
        afterBody: (tooltipItem: any[]) => {
          const total: number = tooltipItem.reduce(
            (prev: number, curr: any) => {
              return prev + curr.dataset.data[curr.dataIndex];
            },
            0
          );
          return `Total: ${total.toLocaleString()} MWh`;
        },
      },
    },
  },
} as CustomChartOptions<"line", LineControllerChartOptions>;

const chartDataOptions: ChartDataOptions = {
  fill: true,
};

const labelPropName = "tarih";

const dppConfig: ChartConfig = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default dppConfig;
