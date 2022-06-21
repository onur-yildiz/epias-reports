import DateIntervalReportView from "./DateIntervalReportView";
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
    <DateIntervalReportView
      data={data?.dayAheadMCPList}
      isLoading={isLoading}
      chartConfig={damMcpConfig}
    />
  );
};

export default DayAheadMcpView;
