import { FC, MouseEventHandler } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useAppDispatch, useAppSelector } from "../hooks";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "../constants/style";
import { logout } from "../store/authSlice";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface AppBarProps {
  title: string;
  open: boolean;
  toggleDrawer: MouseEventHandler;
}

interface CustomAppBarProps extends MuiAppBarProps {
  open: boolean;
}

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<CustomAppBarProps>(({ theme, open }) => ({
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

const AppBar: FC<AppBarProps> = (props: AppBarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAuth, user] = useAppSelector((state) => [
    state.auth.isAuthenticated,
    state.auth.user,
  ]);

  const handleAuthAction = () => {
    if (isAuth) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate(`/account`);
  };

  return (
    <CustomAppBar position="absolute" open={props.open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          "& *": {
            color: (theme) => theme.palette.primary.contrastText,
          },
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(props.open && { display: "none" }),
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
          {props.title}
        </Typography>
        {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            right: (theme) => theme.spacing(2),
          }}
        >
          {isAuth && (
            <Button
              variant="contained"
              disableElevation
              onClick={handleProfileClick}
            >
              {user.name}
            </Button>
          )}
          <Button
            variant="contained"
            disableElevation
            onClick={handleAuthAction}
          >
            {isAuth ? "Logout" : "Login"}
          </Button>
        </Stack>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;
