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
import { format } from "date-fns";
import { setDamMcpParams } from "../../store/paramSlice";
import { useGetDayAheadMcp } from "../../services/reportService";

const DayAheadMcpView = () => {
  const params = useAppSelector((state) => state.param.damMcpParams);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDayAheadMcp({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const handleSubmit = (startDate: Date, endDate: Date) => {
    dispatch(
      setDamMcpParams({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })
    );
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Market Clearing Price",
      },
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return addTooltipLabelSuffix(
              tooltipItem,
              `${tooltipItem.dataset.label}/MWh`
            );
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const chartDataOptions: ChartDataOptions = {
    datasetLabels: ["TL", "USD", "EUR"],
  };

  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm onSubmit={handleSubmit} />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.dayAheadMCPList}
          labelPropName="date"
          isLoading={isLoading}
          chartOptions={chartOptions}
          chartDataOptions={chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default DayAheadMcpView;
