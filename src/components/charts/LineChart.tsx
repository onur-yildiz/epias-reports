import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import chartUtils, { ChartDataOptions } from "../../utils/chartUtils";

import { FC } from "react";
import { Line } from "react-chartjs-2";
import LineChartSkeleton from "./LineChartSkeleton";

interface LineChartProps {
  data: any[] | undefined;
  labelPropName: string;
  isLoading: boolean;
  chartOptions: CustomChartOptions<"line", LineControllerChartOptions>;
  chartDataOptions: ChartDataOptions;
}

const LineChart: FC<LineChartProps> = (props: LineChartProps) => {
  if (!props.data || props.isLoading) return <LineChartSkeleton />;
  const chartData = chartUtils.createChartData(
    props.data,
    props.labelPropName,
    props.chartDataOptions
  );

  return <Line options={props.chartOptions} data={chartData} />;
};

export default LineChart;
