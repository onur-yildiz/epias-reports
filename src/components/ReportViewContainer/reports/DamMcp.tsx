import DateIntervalReportView from "../views/DateIntervalReportView";
import damMcpConfig from "../../../config/charts/damMcp.config";
import { dateIntervalTodayParams } from "../../../constants/params";
import { useAppSelector } from "../../../hooks";
import { useGetDayAheadMcp } from "../../../services/reportService";

const DamMcp = (props: ReportProps) => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["dam-mcp"]
  );
  const { data, isLoading, isError, isFetching } = useGetDayAheadMcp(
    props.static ? dateIntervalTodayParams : params
  );

  return (
    <DateIntervalReportView
      reportKey="dam-mcp"
      data={data?.dayAheadMCPList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={damMcpConfig}
      static={props.static}
    />
  );
};

export default DamMcp;
