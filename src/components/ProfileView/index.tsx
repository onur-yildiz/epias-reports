import AccountInfo from "./components/AccountInfo";
import AccountSuspensionTag from "./components/AccountSuspensionTag";
import ApiKeysTable from "./components/ApiKeysTable";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks";

const ProfileView = () => {
  const isUserActive = useAppSelector((state) => state.auth.user.isActive);
  return (
    <Stack spacing={3} sx={{ p: 3 }} alignItems="flex-start">
      {!isUserActive && <AccountSuspensionTag />}
      <AccountInfo />
      <ApiKeysTable />
    </Stack>
  );
};

export default ProfileView;
