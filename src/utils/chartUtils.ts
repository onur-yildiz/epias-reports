import { ChartData, CoreScaleOptions, Scale, ScatterDataPoint } from "chart.js";

import format from "date-fns/format";

const defaultColors = [
  ["#ff121e", "#ff5c44"],
  ["#1a9b2a", "#3eb542"],
  ["#0a6ab1", "#0093d9"],
  ["#fd7f6f", "#ffac9c"],
  ["#7eb0d5", "#9fcbea"],
  ["#b2e061", "#c9e492"],
  ["#bd7ebe", "#dbabdb"],
  ["#ffb55a", "#ffc98d"],
  ["#ffee65", "#f7e893"],
  ["#b04238", "#c86558"],
  ["#97B649", "#ACC56D"],
  ["#8bd3c7", "#a0e0d5"],
];

interface NormalizeDataOptions {
  valuePropNames?: string[];
  // labelCb?: (label: any) => any; // for additional formatting
  // valueCb?: (value: any) => any; // for additional formatting
}
export interface ChartDataOptions extends NormalizeDataOptions {
  datasetLabels?: string[];
  datasetColors?: string[][];
  hiddenDatasets?: string[];
  fill?: boolean;
}

type NormalizeDataFunction = (
  data: any[],
  labelPropName: string,
  options?: NormalizeDataOptions
) => [any[], any[][], string[]];

const normalizeData: NormalizeDataFunction = (data, labelPropName, options) => {
  const { valuePropNames } = options ?? {};

  const labels: any[] = [];
  const valueProps =
    valuePropNames ??
    Object.getOwnPropertyNames(data[0]).filter(
      (prop) => prop !== labelPropName
    );

  const valuesList: any[][] = Array.from(
    new Array(valueProps.length),
    () => []
  );

  data.forEach((item) => {
    labels.push(item[labelPropName]);

    for (var i = 0; i < valueProps.length; i++) {
      const value = item[valueProps[i]];
      valuesList[i].push(value);
    }
  });

  return [labels, valuesList, valueProps];
};

type CreateChartDataFunction = (
  data: any[],
  labelPropName: string,
  options?: ChartDataOptions
) => ChartData<"line", (number | ScatterDataPoint | null)[], unknown>;

const createChartData: CreateChartDataFunction = (
  data,
  labelPropName,
  options
) => {
  const { valuePropNames, datasetLabels, datasetColors, hiddenDatasets, fill } =
    options ?? {};

  const [labels, valuesList, defaultValueLabels] = normalizeData(
    data,
    labelPropName,
    { valuePropNames }
  );

  const width = Math.min(Math.max(3 / (valuesList[0].length / 48), 0.5), 3); // thinner for every 48 value (min: 0.5, max: 3)
  return {
    labels,
    datasets: valuesList.map((values, index) => {
      const color =
        datasetColors?.at(index) || defaultColors[index % defaultColors.length];

      const label = datasetLabels?.[index] || defaultValueLabels[index];
      const isHidden = hiddenDatasets?.includes(label);

      let borderColor = color[0];
      let pointWidth = fill ? 1 : width;

      return {
        label: label,
        hidden: isHidden,
        data: values,
        fill: fill,
        borderColor: borderColor,
        pointBackgroundColor: borderColor,
        backgroundColor: color[1],
        zIndex: index,
        borderWidth: width,
        pointBorderWidth: pointWidth,
        pointRadius: pointWidth,
        pointHoverRadius: pointWidth * 2,
      };
    }),
  };
};

// export const defaultDateCb = function (
//   this: Scale<CoreScaleOptions>,
//   value: number
// ) {
//   const label = this.getLabelForValue(value);
//   return format(new Date(label), "dd.MM.yyyy HH:mm z");
// };

export const addTooltipLabelSuffix = (tooltipItem: any, suffix: string) => {
  const d = tooltipItem.dataset;
  const value =
    typeof d.data[tooltipItem.dataIndex] === "number"
      ? d.data[tooltipItem.dataIndex].toLocaleString()
      : d.data[tooltipItem.dataIndex];
  return `${d.label}: ${value} ${suffix}`;
};

const chartUtils = {
  normalizeData,
  createChartData,
};

export default chartUtils;
