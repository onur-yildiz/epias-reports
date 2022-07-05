import DateIntervalReportView from "../views/DateIntervalReportView";
import idmMqConfig from "../../../config/charts/idmMq.config";
import { useAppSelector } from "../../../hooks";
import { useGetIntraDayMatchingQuantity } from "../../../services/reportService";

const IdmMq = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-mq"]
  );
  const { data, isLoading, isError, isFetching } =
    useGetIntraDayMatchingQuantity({
      startDate: params.startDate,
      endDate: params.endDate,
    });

  return (
    <DateIntervalReportView
      reportKey="idm-mq"
      data={data?.intraDaySummaryList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={idmMqConfig}
    />
  );
};

export default IdmMq;
