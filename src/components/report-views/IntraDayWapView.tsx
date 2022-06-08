import {
  ChartDataOptions,
  addTooltipLabelSuffix,
} from "../../utils/chartUtils";
import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import { useAppDispatch, useAppSelector } from "../../hooks";

import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import { Fragment } from "react";
import LineChart from "../charts/LineChart";
import format from "date-fns/format";
import { setIdmWapParams } from "../../store/paramSlice";
import { useGetIntraDayWap } from "../../services/reportService";

const IntraDayWapView = () => {
  const params = useAppSelector((state) => state.param.idmWapParams);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetIntraDayWap({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const handleSubmit = (startDate: Date, endDate: Date) => {
    dispatch(
      setIdmWapParams({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })
    );
  };

  const chartOptions = {
    scales: {
      y: {
        title: {
          text: "TL/MWh",
        },
        display: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Weighted Average Price",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return addTooltipLabelSuffix(tooltipItem, "TL/MWh");
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const chartDataOptions: ChartDataOptions = {
    datasetLabels: ["Price"],
  };

  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm onSubmit={handleSubmit} />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.idmAofList}
          labelPropName="date"
          isLoading={isLoading}
          chartOptions={chartOptions}
          chartDataOptions={chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default IntraDayWapView;
