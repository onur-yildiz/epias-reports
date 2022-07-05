import Stack from "@mui/material/Stack";
import { SupervisorAccount } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const AdminTag = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <SupervisorAccount color="primary" />
      <Typography variant="h6" color="primary" component="h1">
        ADMIN
      </Typography>
    </Stack>
  );
};

export default AdminTag;
