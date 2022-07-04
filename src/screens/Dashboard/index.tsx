import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AppBar from "../../components/AppBar";
import AppDrawer from "../../components/AppDrawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

interface DashboardProps {
  onLocationChange?: () => string | undefined;
  menu: JSX.Element;
}

const Dashboard = (props: DashboardProps) => {
  const location = useLocation();
  const [title, setTitle] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setTitle(
      props.onLocationChange?.() ??
        location.pathname.split("/").at(-1)?.toLocaleUpperCase() ??
        "Dashboard"
    );
  }, [location, props]);

  return (
    <Fragment>
      <AppBar open={open} toggleDrawer={toggleDrawer} title={title} />
      <AppDrawer open={open} toggleDrawer={toggleDrawer}>
        {props.menu}
      </AppDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default Dashboard;
