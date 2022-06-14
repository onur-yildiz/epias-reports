import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { format } from "date-fns";

interface ParamState {
  dateIntervalParams: Record<DateIntervalReportKey, DateInterval>;
  activeReportKey?: ReportKey;
}

const todayFormatted = format(new Date(), "yyyy-MM-dd");
const defaultDateInterval = {
  startDate: todayFormatted,
  endDate: todayFormatted,
};

const initialState: ParamState = {
  dateIntervalParams: {
    "dam-mcp": defaultDateInterval,
    "idm-wap": defaultDateInterval,
    "idm-mq": defaultDateInterval,
    "idm-sum": defaultDateInterval,
    "bpm-smp": defaultDateInterval,
    fdpp: defaultDateInterval,
    rtg: defaultDateInterval,
  },
  activeReportKey: "dam-mcp",
};

const paramSlice = createSlice({
  name: "param",
  initialState,
  reducers: {
    setDateIntervalParams(
      state,
      action: PayloadAction<{
        key: DateIntervalReportKey;
        params: DateInterval;
      }>
    ) {
      state.dateIntervalParams[action.payload.key] = action.payload.params;
    },
    setActiveReportKey: (state, action: PayloadAction<ReportKey>) => {
      state.activeReportKey = action.payload;
    },
  },
});

export const { setDateIntervalParams, setActiveReportKey } = paramSlice.actions;

export default paramSlice.reducer;
