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
import { setRtgParams } from "../../store/paramSlice";
import { useGetRtg } from "../../services/reportService";

const RtgView = () => {
  const params = useAppSelector((state) => state.param.damMcpParams);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetRtg({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const handleSubmit = (startDate: Date, endDate: Date) => {
    dispatch(
      setRtgParams({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })
    );
  };

  const chartOptions = {
    scales: {
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Real-Time Generation",
      },
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return addTooltipLabelSuffix(tooltipItem, `MWh`);
          },
          afterBody: (tooltipItem: any[]) => {
            const total = tooltipItem.reduce((prev: number, curr: any) => {
              return prev + curr.dataset.data[curr.dataIndex];
            }, 0);
            return `Total: ${total} MWh`;
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const dataProps = data?.hourlyGenerations
    ? Object.getOwnPropertyNames(data.hourlyGenerations[0]).filter(
        (n) => !["total"].includes(n)
      )
    : [];

  const chartDataOptions: ChartDataOptions = {
    valuePropNames: dataProps,
    fill: true,
  };

  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm onSubmit={handleSubmit} />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.hourlyGenerations}
          labelPropName="date"
          isLoading={isLoading}
          chartOptions={chartOptions}
          chartDataOptions={chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default RtgView;
