import DamMcp from "./ReportViewContainer/reports/DamMcp";
import Dpp from "./ReportViewContainer/reports/Dpp";
import Grid from "@mui/material/Grid";
import IdmMq from "./ReportViewContainer/reports/IdmMq";
import IdmWap from "./ReportViewContainer/reports/IdmWap";
import Rtg from "./ReportViewContainer/reports/Rtg";
import Smp from "./ReportViewContainer/reports/Smp";
import { useAppSelector } from "../hooks";

const mainPageReports: Record<PresentedReportKey, JSX.Element> = {
  "dam-mcp": <DamMcp static />,
  "idm-wap": <IdmWap static />,
  "idm-mq": <IdmMq static />,
  "bpm-smp": <Smp static />,
  dpp: <Dpp static />,
  rtg: <Rtg static />,
};

const ReportsDashboardMainView = () => {
  const reportListingInfo = useAppSelector(
    (state) => state.report.reportListingInfo
  );

  let charts = [];
  for (const reportKey in mainPageReports) {
    if (reportListingInfo?.some((r) => r.key === reportKey))
      charts.push(mainPageReports[reportKey as PresentedReportKey]);
  }

  return (
    <Grid container spacing={3} rowSpacing={3} padding={3}>
      {charts.map((chart) => (
        <Grid item xs={6}>
          {chart}
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportsDashboardMainView;
