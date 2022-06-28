import DateIntervalReportView from "./DateIntervalReportView";
import idmMqConfig from "../../config/charts/idmMq.config";
import { useAppSelector } from "../../hooks";
import { useGetIntraDayMatchingQuantity } from "../../services/reportService";

const IntraDayMqView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-mq"]
  );
  const { data, isLoading } = useGetIntraDayMatchingQuantity({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      reportKey="idm-mq"
      data={data?.intraDaySummaryList}
      isLoading={isLoading}
      chartConfig={idmMqConfig}
    />
  );
};

export default IntraDayMqView;
