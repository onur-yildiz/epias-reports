import Dashboard from "..";
import UserPanelDrawerList from "../../../components/UserPanelDrawerList";

const AccountPanel = () => {
  return <Dashboard menu={<UserPanelDrawerList />} />;
};

export default AccountPanel;
