import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";

import AppBar from "../components/AppBar";
import AppDrawer from "../components/AppDrawer";
import Box from "@mui/material/Box";
import ReportsDrawerList from "../components/ReportsDrawerList";
import Toolbar from "@mui/material/Toolbar";
import { setReports } from "./../store/reportSlice";
import { useGetReportListingInfo } from "../services/reportService";

const ReportsDashboard = () => {
  const { data } = useGetReportListingInfo();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("Reports");
  const [reportRoutes] = useAppSelector((state) => [
    state.report.reportListingInfo,
  ]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const report = reportRoutes.find(
      (p) => p.key === location.pathname.slice(1)
    );
    setTitle(report ? report.name[0].long : location.pathname.slice(1));
  }, [location, reportRoutes]);

  useEffect(() => {
    data && dispatch(setReports(data));
  }, [data, dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title={title} />
      <AppDrawer open={open} toggleDrawer={toggleDrawer}>
        <ReportsDrawerList />
      </AppDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ReportsDashboard;
