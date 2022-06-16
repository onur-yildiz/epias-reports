import Button from "@mui/material/Button";
import DrawerListButton from "./DrawerListButton";
import { Fragment } from "react";
import List from "@mui/material/List";
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
      <DrawerListButton primary="Profile" path="profile" emphasize />
      {isAdmin && (
        <Fragment>
          <DrawerListButton primary="Users" path="admin/users" emphasize />
          <DrawerListButton primary="Reports" path="admin/reports" emphasize />
          <DrawerListButton primary="Roles" path="admin/roles" emphasize />
        </Fragment>
      )}
    </List>
  );
};

export default UserPanelDrawerList;
