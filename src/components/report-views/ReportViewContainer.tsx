import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import DamMcp from "./reports/DamMcp";
import Dpp from "./reports/Dpp";
import DppIun from "./reports/DppIun";
import DppOrg from "./reports/DppOrg";
import IdmMq from "./reports/IdmMq";
import IdmSum from "./reports/IdmSum";
import IdmWap from "./reports/IdmWap";
import Rtg from "./reports/Rtg";
import Smp from "./reports/Smp";
import StatusCode from "../StatusCode";
import { useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";

const keyRoutePairs: Record<ReportKey, JSX.Element> = {
  "dam-mcp": <DamMcp />,
  "idm-wap": <IdmWap />,
  "idm-mq": <IdmMq />,
  "idm-sum": <IdmSum />,
  "bpm-smp": <Smp />,
  dpp: <Dpp />,
  rtg: <Rtg />,
  dpporg: <DppOrg />,
  dppiun: <DppIun />,
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

  return <Box sx={{ pt: 3, px: 3 }}>{component}</Box>;
};

export default ReportViewContainer;
