import { FC } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

interface DrawerListButtonProps {
  primary: string;
  path: string;
  secondary?: string;
}

const DrawerListButton: FC<DrawerListButtonProps> = (
  props: DrawerListButtonProps
) => {
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => navigate(props.path)}>
      <Tooltip title={props.secondary ?? props.primary} placement="right" arrow>
        <ListItemText
          primary={props.primary}
          secondary={props.secondary}
          primaryTypographyProps={{
            variant: "button",
            color: "primary.main",
          }}
          secondaryTypographyProps={{ variant: "caption", noWrap: true }}
        />
      </Tooltip>
    </ListItemButton>
  );
};

export default DrawerListButton;
