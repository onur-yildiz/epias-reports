import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { ChartDataOptions } from "../../utils/chartUtils";
import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { Fragment } from "react";
import LineChart from "../charts/LineChart";
import format from "date-fns/format";
import { parse } from "date-fns";
import { setIdmSummaryParams } from "../../store/paramSlice";
import { useGetIntraDaySummary } from "../../services/reportService";

const IntraDayMqView = () => {
  const params = useAppSelector((state) => state.param.idmSummaryParams);
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetIntraDaySummary({
    startDate: params.startDate,
    endDate: params.endDate,
  });

  const handleSubmit = (startDate: Date, endDate: Date) => {
    dispatch(
      setIdmSummaryParams({
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      })
    );
  };

  const chartOptions = {
    scales: {
      y: {
        title: {
          text: "MWh",
        },
        display: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Matching Quantity",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem: any) => {
            const label: string = tooltipItem[0].label;
            let date = label.slice(2).split("-")[0];
            date = format(
              parse(date, "yyMMddHH", new Date()),
              "dd.MM.yyyy HH:mm z"
            );
            return `${label} - ${date}`;
          },
          label: (tooltipItem: any) => {
            const d = tooltipItem.dataset;
            return `${d.label}: ${d.data[tooltipItem.dataIndex]} MWh`;
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const chartDataOptions: ChartDataOptions = {
    valuePropNames: ["volume"],
    datasetLabels: ["Volume"],
  };

  console.log(error);

  return (
    <Fragment>
      <CustomMuiGrid>
        <DateIntervalForm onSubmit={handleSubmit} />
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        {!isError ? (
          <LineChart
            data={data?.intraDaySummaryList}
            labelPropName="contract"
            isLoading={isLoading}
            chartOptions={chartOptions}
            chartDataOptions={chartDataOptions}
          />
        ) : (
          <div>{((error as FetchBaseQueryError).data as any).message}</div>
        )}
      </CustomMuiGrid>
    </Fragment>
  );
};

export default IntraDayMqView;
