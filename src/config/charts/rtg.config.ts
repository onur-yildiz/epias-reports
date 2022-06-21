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
      stacked: true,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Real-Time Generation",
    },
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        title: defaultDateLabelCallback,
        label: (tooltipItem: any) => {
          return addTooltipLabelSuffix(tooltipItem, `MWh`);
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

const labelPropName = "date";

const rtgConfig: ChartConfig<"line", LineControllerChartOptions> = {
  chartOptions,
  chartDataOptions,
  labelPropName,
};

export default rtgConfig;
