import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  dateIntervalTodayParams,
  dppAllTodayParams,
} from "../constants/params";

interface ParamState {
  dateIntervalParams: Record<DateIntervalReportKey, DateInterval>;
  dpp: DppParams;
}

const initialState: ParamState = {
  dateIntervalParams: {
    "dam-mcp": dateIntervalTodayParams,
    "idm-wap": dateIntervalTodayParams,
    "idm-mq": dateIntervalTodayParams,
    "idm-sum": dateIntervalTodayParams,
    "bpm-smp": dateIntervalTodayParams,
    rtg: dateIntervalTodayParams,
  },
  dpp: dppAllTodayParams,
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
