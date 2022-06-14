import { CustomChartOptions, LineControllerChartOptions } from "chart.js";
import { FC, useRef } from "react";
import chartUtils, { ChartDataOptions } from "../../utils/chartUtils";

import { Download } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Line } from "react-chartjs-2";
import LineChartSkeleton from "./LineChartSkeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import html2canvas from "html2canvas";

interface LineChartProps {
  data: any[] | undefined;
  labelPropName: string;
  isLoading: boolean;
  chartOptions: CustomChartOptions<"line", LineControllerChartOptions>;
  chartDataOptions: ChartDataOptions;
}

const LineChart: FC<LineChartProps> = (props: LineChartProps) => {
  const ref = useRef<any>(null);
  if (!props.data || props.isLoading) return <LineChartSkeleton />;
  const chartData = chartUtils.createChartData(
    props.data,
    props.labelPropName,
    props.chartDataOptions
  );

  const handleDownloadImage = async () => {
    const element = ref.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL("image/jpg", 1);
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <Stack>
      <Tooltip title="Download JPG" arrow>
        <IconButton
          sx={{ alignSelf: "end", position: "absolute" }}
          onClick={handleDownloadImage}
        >
          <Download />
        </IconButton>
      </Tooltip>
      <div ref={ref}>
        <Line options={props.chartOptions} data={chartData} />
      </div>
    </Stack>
  );
};

export default LineChart;
