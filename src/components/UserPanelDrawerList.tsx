import Button from "@mui/material/Button";
import DrawerListButton from "./DrawerListButton";
import DrawerListFolder from "./DrawerListFolder";
import List from "@mui/material/List";
import Person from "@mui/icons-material/Person";
import { useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";

const UserPanelDrawerList = () => {
  const navigate = useNavigate();
  const isAdmin = useAppSelector((state) => state.auth.user.isAdmin);
  return (
    <List sx={{ height: "100%" }}>
      <Button
        sx={{
          width: "100%",
          height: "48px",
        }}
        onClick={() => navigate("/")}
      >
        back to dashboard
      </Button>
      <DrawerListButton
        icon={<Person />}
        primary="Profile"
        path="profile"
        emphasize
      />
      {isAdmin && (
        <DrawerListFolder primary="Admin Settings">
          <DrawerListButton primary="Users" path="admin/users" />
          <DrawerListButton primary="Reports" path="admin/reports" />
          <DrawerListButton primary="Roles" path="admin/roles" />
        </DrawerListFolder>
      )}
    </List>
  );
};

export default UserPanelDrawerList;
