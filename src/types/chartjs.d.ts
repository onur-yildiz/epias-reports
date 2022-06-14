import "chart.js";
import utils from "chart.js/types/utils";

declare module "chart.js" {
  type CustomChartOptions<
    ChartType extends keyof ChartTypeRegistry,
    ChartOptions
  > = utils._DeepPartialObject<
    CoreChartOptions<ChartType> &
      ElementChartOptions<ChartType> &
      PluginChartOptions<ChartType> &
      DatasetChartOptions<ChartType> &
      ScaleChartOptions<ChartType> &
      ChartOptions
  >;

  interface ChartConfig {
    labelPropName: string;
    chartOptions: CustomChartOptions;
    chartDataOptions: ChartDataOptions;
  }
}
