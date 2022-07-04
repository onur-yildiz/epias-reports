import ChartTablePanel from "../ChartTablePanel";
import CustomAgGridTable from "../../custom/CustomAgGridTable";
import DppForm from "../../DppForm";
import LineChart from "../../charts/LineChart";
import StatusWrapper from "../../StatusWrapper";
import dppConfig from "../../../config/charts/dpp.config";
import { useAppSelector } from "../../../hooks";
import { useGetDpp } from "../../../services/reportService";

const Dpp = () => {
  const params = useAppSelector((state) => state.param.dpp);
  const { data, isLoading, isFetching, isError } = useGetDpp({
    startDate: params.startDate,
    endDate: params.endDate,
    organizationEIC: params.organizationEIC,
    uevcbEIC: params.uevcbEIC,
  });

  const dataProps = data?.dppList
    ? Object.getOwnPropertyNames(data?.dppList[0]).filter(
        (n) => !["saat", "toplam"].includes(n)
      )
    : [];

  dppConfig.chartDataOptions.valuePropNames = dataProps;

  return (
    <ChartTablePanel>
      <DppForm />
      <StatusWrapper status={{ isError }}>
        <LineChart
          data={data?.dppList}
          labelPropName={dppConfig.labelPropName}
          isLoading={isLoading || isFetching}
          chartOptions={dppConfig.chartOptions}
          chartDataOptions={dppConfig.chartDataOptions}
        />
      </StatusWrapper>
      {data?.dppList && <CustomAgGridTable data={data?.dppList} />}
    </ChartTablePanel>
  );
};

export default Dpp;
