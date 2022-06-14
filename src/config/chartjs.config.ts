import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import format from "date-fns/format";

Chart.register(
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const d = Chart.defaults;
d.responsive = true;
d.font = {
  ...d.font,
  family: "Montserrat, Lato, sans-serif",
};
d.scales.category.ticks = {
  ...d.scales.category.ticks,
  autoSkip: true,
  maxTicksLimit: 12,
  minRotation: 25,
  maxRotation: 45,
  callback: function (value) {
    const label = this.getLabelForValue(Number(value));
    try {
      return format(new Date(label), "Pp z");
    } catch (error) {
      return label;
    }
  },
};
d.scales.linear.title = {
  ...d.scales.category.title,
  display: true,
  font: {
    weight: "bold",
    size: 16,
  },
};
d.plugins.legend = {
  ...Chart.defaults.plugins.legend,
  display: false,
  position: "top" as const,
};
d.plugins.tooltip = {
  ...Chart.defaults.plugins.tooltip,
  mode: "index",
  intersect: false,
};
d.hover = {
  ...d.hover,
  mode: "index" as const,
  intersect: false,
};
