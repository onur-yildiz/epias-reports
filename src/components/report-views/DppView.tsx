import DateIntervalReportView from "./DateIntervalReportView";
import dppConfig from "../../config/charts/dpp.config";
import { useAppSelector } from "../../hooks";
import { useGetDpp } from "../../services/reportService";

// TODO MISSING PARAMS
const DppView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["fdpp"]
  );
  const { data, isLoading } = useGetDpp({
    startDate: params.startDate,
    endDate: params.endDate,
    organizationEIC: "",
    uevcbEIC: "",
  });

  const dataProps = data?.dppList
    ? Object.getOwnPropertyNames(data?.dppList[0]).filter(
        (n) => !["saat", "toplam"].includes(n)
      )
    : [];

  dppConfig.chartDataOptions.valuePropNames = dataProps;

  return (
    <DateIntervalReportView
      data={data?.dppList}
      isLoading={isLoading}
      chartConfig={dppConfig}
    />
  );
};

export default DppView;
