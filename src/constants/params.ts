import { format } from "date-fns";

const todayFormatted = format(new Date(), "yyyy-MM-dd");
export const dateIntervalTodayParams: DateInterval = {
  startDate: todayFormatted,
  endDate: todayFormatted,
};

export const dppAllTodayParams: DppParams = {
  startDate: todayFormatted,
  endDate: todayFormatted,
  organizationEIC: "",
  uevcbEIC: "",
};
