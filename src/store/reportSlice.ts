import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReportState {
  reportListingInfo?: ReportHierarchyItem[];
}

const initialState: ReportState = {};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<ReportHierarchyItem[]>) => {
      state.reportListingInfo = action.payload;
    },
  },
});

export const { setReports } = reportSlice.actions;

export default reportSlice.reducer;
