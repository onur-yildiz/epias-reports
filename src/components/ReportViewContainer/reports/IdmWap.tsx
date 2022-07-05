import DateIntervalReportView from "../views/DateIntervalReportView";
import { dateIntervalTodayParams } from "../../../constants/params";
import idmWapConfig from "../../../config/charts/idmWap.config";
import { useAppSelector } from "../../../hooks";
import { useGetIntraDayWap } from "../../../services/reportService";

const IdmWap = (props: ReportProps) => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-wap"]
  );
  const { data, isLoading, isError, isFetching } = useGetIntraDayWap(
    props.static ? dateIntervalTodayParams : params
  );

  return (
    <DateIntervalReportView
      reportKey="idm-wap"
      data={data?.idmAofList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={idmWapConfig}
      static={props.static}
    />
  );
};

export default IdmWap;
