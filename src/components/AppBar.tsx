import { FC, Fragment, MouseEvent, MouseEventHandler, useState } from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileBox from "./ProfileBox";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "../constants/style";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../hooks";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuth, user] = useAppSelector((state) => [
    state.auth.isAuthenticated,
    state.auth.user,
  ]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
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
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            right: (theme) => theme.spacing(2),
          }}
        >
          {isAuth ? (
            <Fragment>
              <Button
                variant="contained"
                disableElevation
                onClick={handleProfileMenuOpen}
              >
                <Stack direction="row" spacing={1}>
                  <Typography variant="subtitle1" alignSelf="center">
                    {user.name}
                  </Typography>
                  <Avatar sx={{ bgcolor: "secondary.light" }} />
                </Stack>
              </Button>
              <ProfileBox
                anchorEl={anchorEl}
                onClose={handleProfileMenuClose}
              />
            </Fragment>
          ) : (
            <Button variant="contained" disableElevation onClick={handleLogin}>
              login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;
