import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import Button from "@mui/material/Button";
import DrawerListButton from "./components/DrawerListButton";
import { Fragment } from "react";
import List from "@mui/material/List";
import { useAppSelector } from "../../hooks";
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
        back to reports
      </Button>
      <DrawerListButton key={"account"} primary="Account" path="" emphasize />
      {isAdmin && (
        <Fragment>
          {["users", "reports", "roles"].map((path, i) => (
            <DrawerListButton
              key={i}
              icon={<AdminPanelSettings />}
              primary={path
                .split("/")
                .at(-1)!
                .replace(/\w/, (c) => c.toLocaleUpperCase())}
              path={path}
              emphasize
            />
          ))}
        </Fragment>
      )}
    </List>
  );
};

export default UserPanelDrawerList;
