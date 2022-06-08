import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { format } from "date-fns";

interface ParamState {
  damMcpParams: DateInterval;
  idmWapParams: DateInterval;
  idmSummaryParams: DateInterval;
  bpmSmpParams: DateInterval;
  fdppParams: DateInterval;
  rtgParams: DateInterval;
  dppIunParams: string;
}

const todayFormatted = format(new Date(), "yyyy-MM-dd");
const defaultDateInterval = {
  startDate: todayFormatted,
  endDate: todayFormatted,
};

const initialState: ParamState = {
  damMcpParams: defaultDateInterval,
  idmWapParams: defaultDateInterval,
  idmSummaryParams: defaultDateInterval,
  bpmSmpParams: defaultDateInterval,
  fdppParams: defaultDateInterval,
  rtgParams: defaultDateInterval,
  dppIunParams: todayFormatted,
};

const paramSlice = createSlice({
  name: "param",
  initialState,
  reducers: {
    setDamMcpParams: (state, action: PayloadAction<DateInterval>) => {
      state.damMcpParams = action.payload;
    },
    setIdmWapParams: (state, action: PayloadAction<DateInterval>) => {
      state.idmWapParams = action.payload;
    },
    setIdmSummaryParams: (state, action: PayloadAction<DateInterval>) => {
      state.idmSummaryParams = action.payload;
    },
    setBpmSmpParams: (state, action: PayloadAction<DateInterval>) => {
      state.bpmSmpParams = action.payload;
    },
    setFdppParams: (state, action: PayloadAction<DateInterval>) => {
      state.fdppParams = action.payload;
    },
    setRtgParams: (state, action: PayloadAction<DateInterval>) => {
      state.rtgParams = action.payload;
    },
    setDppIunParams: (state, action: PayloadAction<string>) => {
      state.dppIunParams = action.payload;
    },
  },
});

export const {
  setDamMcpParams,
  setIdmWapParams,
  setIdmSummaryParams,
  setBpmSmpParams,
  setFdppParams,
  setRtgParams,
  setDppIunParams,
} = paramSlice.actions;

export default paramSlice.reducer;
