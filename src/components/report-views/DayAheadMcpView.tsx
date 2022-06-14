import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import { Fragment } from "react";
import LineChart from "../charts/LineChart";
import damMcpConfig from "../../config/charts/damMcp.config";
import { useAppSelector } from "../../hooks";
import { useGetDayAheadMcp } from "../../services/reportService";

const DayAheadMcpView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["dam-mcp"]
  );
  const { data, isLoading } = useGetDayAheadMcp({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.dayAheadMCPList}
          labelPropName="date"
          isLoading={isLoading}
          chartOptions={damMcpConfig.chartOptions}
          chartDataOptions={damMcpConfig.chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default DayAheadMcpView;
