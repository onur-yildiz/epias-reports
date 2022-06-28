import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import { Fragment, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ChartDataOptions } from "../../utils/chartUtils";
import CustomMuiGrid from "../custom/CustomMuiGrid";
import DateIntervalForm from "../DateIntervalForm";
import LineChart from "../charts/LineChart";
import MenuItem from "@mui/material/MenuItem";
import format from "date-fns/format";
import { parse } from "date-fns";
import { useAppSelector } from "../../hooks";
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

  const params = useAppSelector(
    (state) => state.param.dateIntervalParams["idm-sum"]
  );
  const { data, isLoading } = useGetIntraDaySummary({
    startDate: params.startDate,
    endDate: params.endDate,
  });

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
              "Pp" // TODO get timezone
            );
            return `${label} - ${date}`;
          },
        },
      },
    },
  } as CustomChartOptions<"line", LineControllerChartOptions>;

  const chartDataOptions: ChartDataOptions = {
    valuePropNames: config.valuePropNames,
    datasetLabels: config.datasetLabels,
  };

  const tableTypes = Object.getOwnPropertyNames(
    data?.intraDaySummaryList[0] ?? {}
  ).filter((type) => !["date", "id", "contract"].includes(type));

  return (
    <Fragment>
      <CustomMuiGrid variant="large" direction="row">
        <DateIntervalForm reportKey="idm-sum" />
        {data && (
          <Select
            id="summary-table-select"
            value={select}
            onChange={handleTableTypeChange}
          >
            {tableTypes.map((propName, index) => {
              let menuName = propName.replace(/([A-Z])/g, " $1");
              menuName = menuName.charAt(0).toUpperCase() + menuName.slice(1);

              return (
                <MenuItem key={index} value={propName}>
                  {menuName}
                </MenuItem>
              );
            })}
          </Select>
        )}
      </CustomMuiGrid>
      <CustomMuiGrid variant="large">
        <LineChart
          data={data?.intraDaySummaryList}
          labelPropName="contract"
          isLoading={isLoading}
          chartOptions={chartOptions}
          chartDataOptions={chartDataOptions}
        />
      </CustomMuiGrid>
    </Fragment>
  );
};

export default IntraDaySumView;
