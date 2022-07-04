import { Logout, ShowChart } from "@mui/icons-material";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../store/authSlice";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";

const ProfileBox = (props: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(props.anchorEl);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setAnchorEl(props.anchorEl);
  }, [props.anchorEl]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={props.onClose}
      onClick={props.onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={() => handleNavigation("/account")}>
        <Avatar sx={{ bgcolor: "secondary.light" }} />
        My account
      </MenuItem>
      <MenuItem onClick={() => handleNavigation("/")}>
        <Avatar sx={{ bgcolor: "secondary.light" }}>
          <ShowChart />
        </Avatar>
        Reports
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileBox;
