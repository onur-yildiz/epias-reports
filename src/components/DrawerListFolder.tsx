import { PropsWithChildren, useState } from "react";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface DrawerListFolderProps {
  primary: string;
  secondary?: string;
}

const DrawerListFolder = (props: PropsWithChildren<DrawerListFolderProps>) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const ExpandButton = () =>
    open ? <ExpandLess color="secondary" /> : <ExpandMore color="primary" />;

  return (
    <List dense disablePadding>
      <ListItemButton onClick={handleClick}>
        <ExpandButton />
        <ListItemText
          primary={props.primary}
          // secondary={props.secondary}
          primaryTypographyProps={{
            variant: "subtitle1",
            color: "primary.dark",
            fontWeight: "bold",
          }}
        />
      </ListItemButton>
      <Collapse sx={{ pl: 2 }} in={open} timeout="auto" unmountOnExit>
        {props.children}
      </Collapse>
    </List>
  );
};

export default DrawerListFolder;
