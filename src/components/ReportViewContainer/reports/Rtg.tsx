import DateIntervalReportView from "../views/DateIntervalReportView";
import { dateIntervalTodayParams } from "../../../constants/params";
import rtgConfig from "../../../config/charts/rtg.config";
import { useAppSelector } from "../../../hooks";
import { useGetRtg } from "../../../services/reportService";

const Rtg = (props: ReportProps) => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["rtg"]
  );
  const { data, isLoading, isError, isFetching } = useGetRtg(
    props.static ? dateIntervalTodayParams : params
  );

  const dataProps = data?.hourlyGenerations
    ? Object.getOwnPropertyNames(data.hourlyGenerations[0]).filter(
        (n) => !["total"].includes(n)
      )
    : [];

  rtgConfig.chartDataOptions.valuePropNames = dataProps;

  return (
    <DateIntervalReportView
      reportKey="rtg"
      data={data?.hourlyGenerations}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={rtgConfig}
      static={props.static}
    />
  );
};

export default Rtg;
