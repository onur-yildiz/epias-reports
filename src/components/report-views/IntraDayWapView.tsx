import DateIntervalReportView from "./DateIntervalReportView";
import idmWapConfig from "../../config/charts/idmWap.config";
import { useAppSelector } from "../../hooks";
import { useGetIntraDayWap } from "../../services/reportService";

const IntraDayWapView = () => {
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-wap"]
  );
  const { data, isLoading } = useGetIntraDayWap({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <DateIntervalReportView
      reportKey="idm-wap"
      data={data?.idmAofList}
      isLoading={isLoading}
      chartConfig={idmWapConfig}
    />
  );
};

export default IntraDayWapView;
