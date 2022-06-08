import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReportState {
  reports: Report[];
  activeReportName: string;
}

const initialState: ReportState = {
  reports: [
    {
      id: "",
      name: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      // user: {
      //   id: "",
      //   name: "",
      //   email: "",
      // },
      isLoading: false,
    },
  ],
  activeReportName: "",
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
    setActiveReportName: (state, action: PayloadAction<string>) => {
      state.activeReportName = action.payload;
    },
  },
});

export const { setReport } = reportSlice.actions;

export default reportSlice.reducer;
