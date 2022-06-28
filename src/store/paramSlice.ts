import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { format } from "date-fns";

interface ParamState {
  dateIntervalParams: Record<DateIntervalReportKey, DateInterval>;
  dpp: DppParams;
}

const todayFormatted = format(new Date(), "yyyy-MM-dd");
const defaultDateInterval: DateInterval = {
  startDate: todayFormatted,
  endDate: todayFormatted,
};
const defaultDppParams: DppParams = {
  startDate: todayFormatted,
  endDate: todayFormatted,
  organizationEIC: "",
  uevcbEIC: "",
};

const initialState: ParamState = {
  dateIntervalParams: {
    "dam-mcp": defaultDateInterval,
    "idm-wap": defaultDateInterval,
    "idm-mq": defaultDateInterval,
    "idm-sum": defaultDateInterval,
    "bpm-smp": defaultDateInterval,
    rtg: defaultDateInterval,
  },
  dpp: defaultDppParams,
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
    setDppParams: (state, action: PayloadAction<DppParams>) => {
      state.dpp = action.payload;
    },
  },
});

export const { setDateIntervalParams, setDppParams } = paramSlice.actions;

export default paramSlice.reducer;
