import Dashboard from "..";
import UserPanelDrawerList from "../../../components/drawer-lists/UserPanelDrawerList";

const AccountPanel = () => {
  return <Dashboard menu={<UserPanelDrawerList />} />;
};

export default AccountPanel;
