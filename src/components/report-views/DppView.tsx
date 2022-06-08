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
import { setFdppParams } from "../../store/paramSlice";
import { useGetDpp } from "../../services/reportService";

// TODO MISSING PARAMS
const DppView = () => {
  const params = useAppSelector((state) => state.param.fdppParams);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetDpp({
    startDate: params.startDate,
    endDate: params.endDate,
    organizationEIC: "",
    uevcbEIC: "",
  });

  const handleSubmit = (startDate: Date, endDate: Date) => {
    dispatch(
      setFdppParams({
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
        text: "Final Daily Production Program",
      },
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return addTooltipLabelSuffix(tooltipItem, "MWh");
          },
          afterBody: (tooltipItem: any[]) => {
            const total: number = tooltipItem.reduce(
              (prev: number, curr: any) => {
                return prev + curr.dataset.data[curr.dataIndex];
              },
              0
            );
            return `Total: ${total.toLocaleString()} MWh`;
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const dataProps = data?.dppList
    ? Object.getOwnPropertyNames(data?.dppList[0]).filter(
        (n) => !["tarih", "saat", "toplam"].includes(n)
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
          data={data?.dppList}
          labelPropName="tarih"
          isLoading={isLoading}
          chartOptions={chartOptions}
          chartDataOptions={chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default DppView;
