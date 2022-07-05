import DateIntervalReportView from "../views/DateIntervalReportView";
import { dateIntervalTodayParams } from "../../../constants/params";
import idmMqConfig from "../../../config/charts/idmMq.config";
import { useAppSelector } from "../../../hooks";
import { useGetIntraDayMatchingQuantity } from "../../../services/reportService";

const IdmMq = (props: ReportProps) => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-mq"]
  );
  const { data, isLoading, isError, isFetching } =
    useGetIntraDayMatchingQuantity(
      props.static ? dateIntervalTodayParams : params
    );

  return (
    <DateIntervalReportView
      reportKey="idm-mq"
      data={data?.intraDaySummaryList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={idmMqConfig}
      static={props.static}
    />
  );
};

export default IdmMq;
