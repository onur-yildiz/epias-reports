import DateIntervalReportView from "../views/DateIntervalReportView";
import idmWapConfig from "../../../config/charts/idmWap.config";
import { useAppSelector } from "../../../hooks";
import { useGetIntraDayWap } from "../../../services/reportService";

const IdmWap = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-wap"]
  );
  const { data, isLoading, isError, isFetching } = useGetIntraDayWap({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      reportKey="idm-wap"
      data={data?.idmAofList}
      isLoading={isLoading || isFetching}
      isError={isError}
      chartConfig={idmWapConfig}
    />
  );
};

export default IdmWap;
