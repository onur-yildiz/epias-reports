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
import StatusCode from "../StatusCode";
import { useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";

const keyRoutePairs: Record<ReportKey, JSX.Element> = {
  "dam-mcp": <DayAheadMcpView />,
  "idm-wap": <IntraDayWapView />,
  "idm-mq": <IntraDayMqView />,
  "idm-sum": <IntraDaySumView />,
  "bpm-smp": <SmpView />,
  dpp: <DppView />,
  rtg: <RtgView />,
  dpporg: <DppOrgView />,
  dppiun: <DppIunView />,
};

const ReportViewContainer = () => {
  let { reportKey } = useParams();
  const [component, setComponent] = useState<JSX.Element>();
  const routeExists = useAppSelector((state) =>
    state.report.reportListingInfo?.some((r) => r.key === reportKey)
  );

  useEffect(() => {
    const routeComponent = keyRoutePairs[reportKey as ReportKey];
    if (routeExists) setComponent(routeComponent);
    else setComponent(<StatusCode value={routeComponent ? 403 : 404} />);
  }, [reportKey, routeExists]);

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={3}>
        {component}
      </Grid>
    </Container>
  );
};

export default ReportViewContainer;
