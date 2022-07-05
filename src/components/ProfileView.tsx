import {
  useGetApiKeys,
  useLazyCreateApiKey,
  useLazyDeleteApiKey,
} from "../services/userService";

import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import DelayedSnackbar from "./DelayedSnackbar";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../hooks";
import { useState } from "react";

const ProfileView = () => {
  const isUserActive = useAppSelector((state) => state.auth.user.isActive);
  return (
    <Stack spacing={3} sx={{ p: 3 }} alignItems="flex-start">
      {!isUserActive && <AccountSuspensionTag />}
      <AccountInfo />
      <ApiKeys />
    </Stack>
  );
};

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

const InfoText = ({ title, value }: { title: string; value: string }) => {
  return (
    <Box>
      <Typography display="inline" fontWeight="bold">
        {title}
        {": "}
      </Typography>
      <Typography display="inline">{value}</Typography>
    </Box>
  );
};

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

const ApiKeys = () => {
  const userId = useAppSelector((state) => state.auth.user.id);
  const [isUpdatingApiKeys, setIsUpdatingApiKeys] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [createApiKey] = useLazyCreateApiKey();
  const [deleteApiKey] = useLazyDeleteApiKey();
  const { data: apiKeys } = useGetApiKeys(userId);

  const handleGenerateApiKey = async () => {
    try {
      setIsUpdatingApiKeys(true);
      await createApiKey(userId).unwrap();
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingApiKeys(false);
  };

  const handleDeleteApiKey = async (apiKey: string) => {
    try {
      setIsUpdatingApiKeys(true);
      await deleteApiKey({ body: { apiKey }, userId: userId }).unwrap();
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingApiKeys(false);
  };

  const handleCopyToClipboard = (apiKey: string) => {
    setIsCopied(true);
    window.navigator.clipboard.writeText(apiKey);
  };

  return (
    <Container maxWidth="md" disableGutters>
      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  API Keys{" "}
                  <Button
                    onClick={handleGenerateApiKey}
                    disabled={apiKeys && apiKeys.length >= 3}
                  >
                    Generate Key
                  </Button>
                </TableCell>
                <TableCell>
                  {apiKeys && apiKeys.length > 0 && "Actions"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiKeys?.map((apiKey) => (
                <TableRow hover sx={{ ":hover": { cursor: "pointer" } }}>
                  <TableCell onClick={() => handleCopyToClipboard(apiKey.key)}>
                    {apiKey.key}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteApiKey(apiKey.key)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar
        open={isCopied}
        autoHideDuration={2000}
        onClose={() => setIsCopied(false)}
        message="Copied to clipboard"
      />
      <DelayedSnackbar open={isUpdatingApiKeys} message="Updating..." />
    </Container>
  );
};

export default ProfileView;
