import DateIntervalReportView from "./DateIntervalReportView";
import idmMqConfig from "../../config/charts/idmMq.config";
import { useAppSelector } from "../../hooks";
import { useGetIntraDaySummary } from "../../services/reportService";

const IntraDayMqView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-mq"]
  );
  const { data, isLoading } = useGetIntraDaySummary({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      data={data?.intraDaySummaryList}
      isLoading={isLoading}
      chartConfig={idmMqConfig}
    />
  );
};

export default IntraDayMqView;
