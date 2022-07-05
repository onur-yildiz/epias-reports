import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../../hooks";

const RoleTags = () => {
  const roles = useAppSelector((state) => state.auth.user.roles);
  return roles.length > 0 ? (
    <Stack direction="row" spacing={1}>
      {roles.map((role) => {
        return (
          <Paper
            key={role}
            sx={{
              py: 0.5,
              px: 1,
              userSelect: "none",
              backgroundColor: "secondary.light",
            }}
            variant="outlined"
          >
            <Typography variant="subtitle2" color="secondary.contrastText">
              {role}
            </Typography>
          </Paper>
        );
      })}
    </Stack>
  ) : null;
};

export default RoleTags;
