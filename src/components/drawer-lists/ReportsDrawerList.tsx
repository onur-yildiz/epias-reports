import { useEffect, useState } from "react";

import DrawerListButton from "./components/DrawerListButton";
import DrawerListFolder from "./components/DrawerListFolder";
import DrawerListSkeleton from "./components/DrawerListSkeleton";
import List from "@mui/material/List";
import { createMenu } from "../../utils/menu";
import { useAppSelector } from "../../hooks";

const ReportsDrawerList = () => {
  const [listItems, setListItems] = useState<JSX.Element[]>([]);
  const reportRoutes = useAppSelector(
    (state) => state.report.reportListingInfo
  );

  useEffect(() => {
    if (!reportRoutes) return;
    const menu = createMenu(
      reportRoutes
        .map((r) => ({ ...r }))
        .sort((a, b) => a.order.localeCompare(b.order))
    );
    const generateListItems = (folder: any) => {
      return folder.children!.map((route: any) => {
        let primary;
        let secondary;
        if ("children" in route) {
          route = route as FolderRoute;
          primary = route.name[0].short ?? "";
          return (
            <DrawerListFolder key={Math.random()} primary={primary}>
              {generateListItems(route)}
            </DrawerListFolder>
          );
        } else {
          if (!route.key) return null;
          route = route as ReportRoute;
          primary = route.name[0].short ?? "";
          secondary = route.name[0].long;
          return (
            <DrawerListButton
              key={Math.random()}
              primary={primary}
              secondary={secondary}
              path={route.key}
            />
          );
        }
      });
    };

    setListItems(generateListItems(menu));
  }, [reportRoutes]);

  if (!reportRoutes) return <DrawerListSkeleton />;
  return <List component="nav">{listItems}</List>;
};

export default ReportsDrawerList;
