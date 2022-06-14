import DateIntervalReportView from "./DateIntervalReportView";
import rtgConfig from "../../config/charts/rtg.config";
import { useAppSelector } from "../../hooks";
import { useGetRtg } from "../../services/reportService";

const RtgView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["rtg"]
  );
  const { data, isLoading } = useGetRtg({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const dataProps = data?.hourlyGenerations
    ? Object.getOwnPropertyNames(data.hourlyGenerations[0]).filter(
        (n) => !["total"].includes(n)
      )
    : [];

  rtgConfig.chartDataOptions.valuePropNames = dataProps;

  return (
    <DateIntervalReportView
      data={data?.hourlyGenerations}
      isLoading={isLoading}
      chartConfig={rtgConfig}
    />
  );
};

export default RtgView;
