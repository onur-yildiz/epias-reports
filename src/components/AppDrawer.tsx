import { MouseEventHandler, PropsWithChildren } from "react";

import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "../constants/style";
import { styled } from "@mui/material/styles";

interface AppDrawerProps {
  open: boolean;
  toggleDrawer: MouseEventHandler;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    }),
  },
}));

const AppDrawer = (props: PropsWithChildren<AppDrawerProps>) => {
  return (
    <Drawer variant="permanent" open={props.open} sx={{ height: "100vh" }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      {props.children}
    </Drawer>
  );
};

export default AppDrawer;
