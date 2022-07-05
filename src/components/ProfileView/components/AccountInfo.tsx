import AdminTag from "./AdminTag";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InfoText from "./InfoText";
import Paper from "@mui/material/Paper";
import RoleTags from "./RoleTags";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../hooks";

const AccountInfo = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Container maxWidth="md" disableGutters sx={{ m: 0 }}>
      <Paper sx={{ p: 2 }} variant="outlined">
        <Stack spacing={1}>
          {user.isAdmin && <AdminTag />}
          <Typography variant="h4" color="GrayText" textAlign="left">
            {user.name.toLocaleUpperCase()}
          </Typography>
          <InfoText title="Email" value={user.email} />
          <InfoText
            title="Language"
            value={user.languageCode.toLocaleUpperCase()}
          />
          <Box sx={{ pt: 3 }}>
            <RoleTags />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AccountInfo;
