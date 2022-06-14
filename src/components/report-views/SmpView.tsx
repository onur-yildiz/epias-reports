import DateIntervalReportView from "./DateIntervalReportView";
import smpConfig from "../../config/charts/smp.config";
import { useAppSelector } from "../../hooks";
import { useGetSmp } from "../../services/reportService";

const SmpView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["bpm-smp"]
  );
  const { data, isLoading } = useGetSmp({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      data={data?.smpList}
      isLoading={isLoading}
      chartConfig={smpConfig}
    />
  );
};

export default SmpView;
