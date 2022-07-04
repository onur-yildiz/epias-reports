import DateIntervalReportView from "../DateIntervalReportView";
import damMcpConfig from "../../../config/charts/damMcp.config";
import { useAppSelector } from "../../../hooks";
import { useGetDayAheadMcp } from "../../../services/reportService";

const DamMcp = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["dam-mcp"]
  );
  const { data, isLoading, isError, isFetching } = useGetDayAheadMcp({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      reportKey="dam-mcp"
      data={data?.dayAheadMCPList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={damMcpConfig}
    />
  );
};

export default DamMcp;
