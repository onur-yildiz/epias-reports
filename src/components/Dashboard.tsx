import * as React from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../hooks";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import DrawerList from "./DrawerList";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { logout } from "../store/authSlice";
import reportHierarchy from "../constants/reportHierarchy";
import { useEffect } from "react";

interface NamePathPair {
  name: string;
  path: string;
}

const getReportNamePathPairs = (
  reports: ReportHierarchyItem[]
): NamePathPair[] => {
  return reports.flatMap((report) => {
    if (report.children) return getReportNamePathPairs(report.children);
    return {
      path: report.path,
      name: report.reportName[0].long,
    };
  });
};

const reportNamePathPairs = getReportNamePathPairs(reportHierarchy);

const drawerWidth: number = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

function DashboardContent() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("Dashboard");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogAction = () => {
    if (isAuth) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const pair = reportNamePathPairs.find(
      (p) => p.path === location.pathname.slice(1)
    );
    setTitle(pair ? pair.name : "Dashboard");
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Button
            sx={{
              color: theme.palette.primary.contrastText,
              position: "absolute",
              right: theme.spacing(2),
            }}
            onClick={handleLogAction}
          >
            {isAuth ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ height: "100vh" }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <DrawerList />
      </Drawer>
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
}

export default function Dashboard() {
  return <DashboardContent />;
}
