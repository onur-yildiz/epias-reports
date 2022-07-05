import Box from "@mui/material/Box";
import { FC } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

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
  return (
    <ListItemButton onClick={() => navigate(props.path)}>
      <Box
        sx={{
          "& *": {
            color: "primary.main",
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
            color: props.emphasize ? "primary.dark" : "primary.main",
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
