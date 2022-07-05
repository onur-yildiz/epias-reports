import { PropsWithChildren, useState } from "react";

import CustomStack from "../../custom/CustomStack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ChartTablePanel = (props: PropsWithChildren<any>) => {
  const [tabValue, setTabValue] = useState("chart");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  return (
    <TabContext value={tabValue}>
      <CustomStack>
        {props.children[0]}
        <TabList onChange={handleTabChange} aria-label="report tabs">
          <Tab label="Chart" value="chart" />
          <Tab label="Table" value="table" />
        </TabList>
      </CustomStack>
      <TabPanel value="chart" sx={{ width: "100%", px: 0 }}>
        <CustomStack>{props.children[1]}</CustomStack>
      </TabPanel>
      <TabPanel value="table" sx={{ px: 0 }}>
        {props.children[2]}
      </TabPanel>
    </TabContext>
  );
};

export default ChartTablePanel;
