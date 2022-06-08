import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import { Fragment, useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { ChartDataOptions } from "../../utils/chartUtils";
import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import LineChart from "../charts/LineChart";
import format from "date-fns/format";
import { parse } from "date-fns";
import { setIdmSummaryParams } from "../../store/paramSlice";
import { useGetIntraDaySummary } from "../../services/reportService";

interface SummaryConfig {
  yTitle: string;
  chartTitle: string;
  valuePropNames: string[];
  datasetLabels: string[];
}

const IntraDaySumView = () => {
  const [config, setConfig] = useState<SummaryConfig>({
    yTitle: "",
    chartTitle: "Matching Quantity",
    valuePropNames: ["volume"],
    datasetLabels: ["Volume"],
  });
  const [select, setSelect] = useState<string>("volume");

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

  const handleTableTypeChange = (e: SelectChangeEvent) => {
    const tableType = e.target.value;
    let formattedName = tableType.replace(/([A-Z])/g, " $1");
    formattedName =
      formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

    setConfig({
      chartTitle: formattedName,
      datasetLabels: [formattedName],
      valuePropNames: [tableType],
      yTitle: "",
    });
    setSelect(tableType);
  };

  const chartOptions = {
    scales: {
      y: {
        title: {
          text: config.yTitle,
        },
        display: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: config.chartTitle,
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
          // label: (tooltipItem: any) => {
          //   const d = tooltipItem.dataset;
          //   return `${d.label}: ${d.data[tooltipItem.dataIndex]} MWh`;
          // },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const chartDataOptions: ChartDataOptions = {
    valuePropNames: config.valuePropNames,
    datasetLabels: config.datasetLabels,
    // labelCb: (label: string) => format(new Date(label), "dd.MM.yyyy HH:mm z"),
  };

  const tableTypes = Object.getOwnPropertyNames(
    data?.intraDaySummaryList[0] ?? {}
  ).filter((type) => !["date", "id", "contract"].includes(type));

  return (
    <Fragment>
      <CustomMuiGrid variant="large" direction="row">
        <DateIntervalForm onSubmit={handleSubmit} />
        {data && (
          <Select
            id="summary-table-select"
            value={select}
            onChange={handleTableTypeChange}
          >
            {tableTypes.map((propName) => {
              let menuName = propName.replace(/([A-Z])/g, " $1");
              menuName = menuName.charAt(0).toUpperCase() + menuName.slice(1);

              return <MenuItem value={propName}>{menuName}</MenuItem>;
            })}
          </Select>
        )}
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

export default IntraDaySumView;
