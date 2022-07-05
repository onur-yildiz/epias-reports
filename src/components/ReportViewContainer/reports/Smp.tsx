import DateIntervalReportView from "../views/DateIntervalReportView";
import smpConfig from "../../../config/charts/smp.config";
import { useAppSelector } from "../../../hooks";
import { useGetSmp } from "../../../services/reportService";

const Smp = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["bpm-smp"]
  );
  const { data, isLoading, isError, isFetching } = useGetSmp({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      reportKey="bpm-smp"
      data={data?.smpList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={smpConfig}
    />
  );
};

export default Smp;
