import { useAppDispatch, useAppSelector } from "../../../hooks";

import Dashboard from "..";
import ReportsDrawerList from "../../../components/drawer-lists/ReportsDrawerList";
import { setReports } from "../../../store/reportSlice";
import { useEffect } from "react";
import { useGetReportListingInfo } from "../../../services/reportService";
import { useLocation } from "react-router-dom";

const ReportsDashboard = () => {
  const { data } = useGetReportListingInfo();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [reportRoutes] = useAppSelector((state) => [
    state.report.reportListingInfo,
  ]);

  useEffect(() => {
    data && dispatch(setReports(data));
  }, [data, dispatch]);

  const handleLocationChange = () => {
    const report = reportRoutes?.find(
      (p) => p.key === location.pathname.slice(1)
    );
    return report?.name[0].long.toLocaleUpperCase();
  };

  return (
    <Dashboard
      menu={<ReportsDrawerList />}
      onLocationChange={handleLocationChange}
    />
  );
};

export default ReportsDashboard;
