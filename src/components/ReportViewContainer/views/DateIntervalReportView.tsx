import { ChartConfig, ChartTypeRegistry } from "chart.js";

import ChartTablePanel from "../layout/ChartTablePanel";
import CustomAgGridTable from "../../custom/CustomAgGridTable";
import CustomStack from "../../custom/CustomStack";
import DateIntervalForm from "../forms/DateIntervalForm";
import { FC } from "react";
import LineChart from "../../charts/LineChart";
import StatusWrapper from "../../StatusWrapper";

interface DateIntervalReportViewProps {
  data: any[] | undefined;
  isLoading: boolean;
  isError: boolean;
  chartConfig: ChartConfig<keyof ChartTypeRegistry, any>;
  reportKey: DateIntervalReportKey;
  static?: boolean;
}

const DateIntervalReportView: FC<DateIntervalReportViewProps> = (
  props: DateIntervalReportViewProps
) => {
  const ChartView = (
    <StatusWrapper status={{ isError: props.isError }}>
      <LineChart
        data={props.data}
        labelPropName={props.chartConfig.labelPropName}
        isLoading={props.isLoading}
        chartOptions={props.chartConfig.chartOptions}
        chartDataOptions={props.chartConfig.chartDataOptions}
      />
    </StatusWrapper>
  );

  return props.static ? (
    <CustomStack sx={{ p: 3 }}>{ChartView}</CustomStack>
  ) : (
    <ChartTablePanel>
      <DateIntervalForm reportKey={props.reportKey} />
      {ChartView}
      {props.data && <CustomAgGridTable data={props.data} />}
    </ChartTablePanel>
  );
};

export default DateIntervalReportView;
