import DateIntervalReportView from "../views/DateIntervalReportView";
import { dateIntervalTodayParams } from "../../../constants/params";
import smpConfig from "../../../config/charts/smp.config";
import { useAppSelector } from "../../../hooks";
import { useGetSmp } from "../../../services/reportService";

const Smp = (props: ReportProps) => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["bpm-smp"]
  );
  const { data, isLoading, isError, isFetching } = useGetSmp(
    props.static ? dateIntervalTodayParams : params
  );

  return (
    <DateIntervalReportView
      reportKey="bpm-smp"
      data={data?.smpList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={smpConfig}
      static={props.static}
    />
  );
};

export default Smp;
