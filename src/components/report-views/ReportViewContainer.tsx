import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import DayAheadMcpView from "./DayAheadMcpView";
import DppIunView from "./DppIunView";
import DppOrgView from "./DppOrgView";
import DppView from "./DppView";
import Grid from "@mui/material/Grid";
import IntraDayMqView from "./IntraDayMqView";
import IntraDaySumView from "./IntraDaySumView";
import IntraDayWapView from "./IntraDayWapView";
import RtgView from "./RtgView";
import SmpView from "./SmpView";
import { setActiveReportKey } from "../../store/paramSlice";
import { useParams } from "react-router-dom";

const getReportView = (reportKey: ReportKey) => {
  switch (reportKey) {
    case "dam-mcp":
      return <DayAheadMcpView />;
    case "idm-wap":
      return <IntraDayWapView />;
    case "idm-mq":
      return <IntraDayMqView />;
    case "idm-sum":
      return <IntraDaySumView />;
    case "bpm-smp":
      return <SmpView />;
    case "fdpp":
      return <DppView />;
    case "rtg":
      return <RtgView />;
    case "dpporg":
      return <DppOrgView />;
    case "dppiun":
      return <DppIunView />;
    default:
      return <Container>404 Not Found</Container>;
  }
};

const ReportViewContainer = () => {
  let { reportKey } = useParams();
  const [component, setComponent] = useState<JSX.Element>(
    <Container>404 Not Found</Container>
  );
  const [reportRoute, userRoles] = useAppSelector((state) => {
    return [
      state.report.reportListingInfo.find((r) => r.key === reportKey),
      state.auth.user.roles,
    ];
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveReportKey(reportKey as ReportKey));
    setComponent(getReportView(reportKey as ReportKey));
  }, [reportKey, dispatch]);

  const show = reportRoute?.roles
    ? reportRoute.roles.every((r) => userRoles.includes(r))
    : true;
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={3}>
        {show ? component : <Container>403 Forbidden</Container>}
      </Grid>
    </Container>
  );
};

export default ReportViewContainer;
