import AppBar from "../components/AppBar";
import AppDrawer from "../components/AppDrawer";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import UserPanelDrawerList from "../components/UserPanelDrawerList";
import { useState } from "react";

const AccountPanel = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title="Account Panel" />
      <AppDrawer open={open} toggleDrawer={toggleDrawer}>
        <UserPanelDrawerList />
      </AppDrawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AccountPanel;
