import ChartTablePanel from "../layout/ChartTablePanel";
import CustomAgGridTable from "../../custom/CustomAgGridTable";
import DppForm from "../forms/DppForm";
import LineChart from "../../charts/LineChart";
import Paper from "@mui/material/Paper";
import StatusWrapper from "../../StatusWrapper";
import { dppAllTodayParams } from "../../../constants/params";
import dppConfig from "../../../config/charts/dpp.config";
import { useAppSelector } from "../../../hooks";
import { useGetDpp } from "../../../services/reportService";

const Dpp = (props: ReportProps) => {
  const params = useAppSelector((state) => state.param.dpp);
  const { data, isLoading, isFetching, isError } = useGetDpp(
    props.static ? dppAllTodayParams : params
  );

  const dataProps = data?.dppList
    ? Object.getOwnPropertyNames(data?.dppList[0]).filter(
        (n) => !["saat", "toplam"].includes(n)
      )
    : [];

  dppConfig.chartDataOptions.valuePropNames = dataProps;

  const ChartView = (
    <StatusWrapper status={{ isError }}>
      <LineChart
        data={data?.dppList}
        labelPropName={dppConfig.labelPropName}
        isLoading={isLoading || isFetching}
        chartOptions={dppConfig.chartOptions}
        chartDataOptions={dppConfig.chartDataOptions}
      />
    </StatusWrapper>
  );
  return props.static ? (
    <Paper sx={{ p: 3 }}>{ChartView}</Paper>
  ) : (
    <ChartTablePanel>
      <DppForm />
      {ChartView}
      {data?.dppList && <CustomAgGridTable data={data?.dppList} />}
    </ChartTablePanel>
  );
};

export default Dpp;
