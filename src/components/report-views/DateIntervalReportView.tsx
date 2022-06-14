import { FC, Fragment } from "react";

import { ChartConfig } from "chart.js";
import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import LineChart from "../charts/LineChart";

interface DateIntervalReportViewProps {
  data: any[] | undefined;
  isLoading: boolean;
  chartConfig: ChartConfig;
}

const DateIntervalReportView: FC<DateIntervalReportViewProps> = (
  props: DateIntervalReportViewProps
) => {
  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={props.data}
          labelPropName={props.chartConfig.labelPropName}
          isLoading={props.isLoading}
          chartOptions={props.chartConfig.chartOptions}
          chartDataOptions={props.chartConfig.chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default DateIntervalReportView;
