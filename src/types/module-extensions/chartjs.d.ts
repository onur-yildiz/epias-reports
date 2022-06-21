import "chart.js";
import utils from "chart.js/types/utils";
import { ChartDataOptions } from "../../utils/chartUtils";

declare module "chart.js" {
  type CustomChartOptions<
    ChartType extends keyof ChartTypeRegistry,
    TChartOptions
  > = utils._DeepPartialObject<
    CoreChartOptions<ChartType> &
      ElementChartOptions<ChartType> &
      PluginChartOptions<ChartType> &
      DatasetChartOptions<ChartType> &
      ScaleChartOptions<ChartType> &
      TChartOptions
  >;

  interface ChartConfig<T extends keyof ChartTypeRegistry, U> {
    labelPropName: string;
    chartOptions: CustomChartOptions<T, U>;
    chartDataOptions: ChartDataOptions;
  }
}
