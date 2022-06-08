import Container from "@mui/material/Container";
import DayAheadMcpView from "./DayAheadMcpView";
import DppIunView from "./DppIunView";
import DppOrgView from "./DppOrgView";
import DppView from "./DppView";
import Grid from "@mui/material/Grid";
import IntraDayMqView from "./IntraDayMqView";
import IntraDaySumView from "./IntraDaySumView";
import IntraDayWapView from "./IntraDayWapView";
import { PropsWithChildren } from "react";
import RtgView from "./RtgView";
import SmpView from "./SmpView";

interface ReportViewProps {
  report: ReportKey;
}

const ReportViewContainer = (props: PropsWithChildren<ReportViewProps>) => {
  const getReportView = () => {
    switch (props.report) {
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
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={3}>
        {getReportView()}
      </Grid>
    </Container>
  );
};

export default ReportViewContainer;
