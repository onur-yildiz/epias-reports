import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import { FC } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

interface DrawerListButtonProps {
  primary: string;
  path: string;
  secondary?: string;
  emphasize?: boolean;
  icon?: React.ReactElement;
}

const DrawerListButton: FC<DrawerListButtonProps> = (
  props: DrawerListButtonProps
) => {
  const navigate = useNavigate();

  const path = useLocation().pathname.split("/").at(-1);
  const isActive = path === props.path;
  const defaultColor = props.emphasize ? "primary.dark" : "primary.main";
  return (
    <ListItemButton
      onClick={() => navigate(props.path)}
      sx={{
        borderRightWidth: "4px",
        borderRightStyle: "solid",
        borderColor: isActive ? "secondary.main" : "transparent",
      }}
    >
      <Box
        sx={{
          "& *": {
            color: isActive ? "secondary.main" : "primary.main",
            mr: 0.5,
          },
        }}
      >
        {props.icon}
      </Box>
      <Tooltip title={props.secondary ?? props.primary} placement="right" arrow>
        <ListItemText
          primary={props.primary}
          secondary={props.secondary}
          primaryTypographyProps={{
            variant: props.emphasize ? "subtitle1" : "subtitle2",
            color: isActive ? "secondary.main" : defaultColor,
            fontWeight: props.emphasize ? "bolder" : "bold",
          }}
          secondaryTypographyProps={{
            variant: "caption",
            noWrap: true,
          }}
        />
      </Tooltip>
    </ListItemButton>
  );
};

export default DrawerListButton;
