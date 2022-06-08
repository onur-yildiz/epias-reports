import { useEffect, useState } from "react";

import DrawerListButton from "./DrawerListButton";
import DrawerListFolder from "./DrawerListFolder";
import { List } from "@mui/material";
import reportHierarchy from "../constants/reportHierarchy";

const DrawerList = () => {
  const [listItems, setListItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateListItems = (reportListItems: ReportHierarchyItem[]) => {
      return reportListItems.map((report) => {
        let primary;
        let secondary;
        if ("folderName" in report) {
          report = report as FolderRoute;
          primary = report.folderName[0].short ?? "";
          return (
            <DrawerListFolder key={Math.random()} primary={primary}>
              {generateListItems(report.children)}
            </DrawerListFolder>
          );
        } else {
          report = report as ReportRoute;
          primary = report.reportName[0].short ?? "";
          secondary = report.reportName[0].long;
          return (
            <DrawerListButton
              key={report.path}
              primary={primary}
              secondary={secondary}
              path={report.path}
            />
          );
        }
      });
    };

    setListItems(generateListItems(reportHierarchy));
  }, []);

  return <List component="nav">{listItems}</List>;
};

export default DrawerList;
