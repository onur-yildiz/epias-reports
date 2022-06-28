import CustomMuiGrid from "../custom/CustomMuiGrid";
import DppForm from "../DppForm";
import { Fragment } from "react";
import LineChart from "../charts/LineChart";
import dppConfig from "../../config/charts/dpp.config";
import { useAppSelector } from "../../hooks";
import { useGetDpp } from "../../services/reportService";

const DppView = () => {
  const params = useAppSelector((state) => state.param.dpp);
  const { data, isLoading } = useGetDpp({
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

  console.log("A");
  return (
    <Fragment>
      <DppForm />
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.dppList}
          labelPropName={dppConfig.labelPropName}
          isLoading={isLoading}
          chartOptions={dppConfig.chartOptions}
          chartDataOptions={dppConfig.chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default DppView;
