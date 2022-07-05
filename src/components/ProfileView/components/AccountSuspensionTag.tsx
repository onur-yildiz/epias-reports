import BlockIcon from "@mui/icons-material/Block";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AccountSuspensionTag = () => {
  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: (theme) => theme.palette.error.main,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          "& *": {
            color: (theme) => theme.palette.error.contrastText,
          },
        }}
      >
        <BlockIcon />
        <Typography variant="h6" component="h1">
          ACCOUNT SUSPENDED
        </Typography>
      </Stack>
    </Paper>
  );
};

export default AccountSuspensionTag;
