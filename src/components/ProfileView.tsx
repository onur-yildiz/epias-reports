import { Delete, Key } from "@mui/icons-material";
import {
  useGetApiKeys,
  useLazyCreateApiKey,
  useLazyDeleteApiKey,
} from "../services/userService";

import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DelayedSnackbar from "./DelayedSnackbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../hooks";
import { useState } from "react";

const ProfileView = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [isUpdatingApiKeys, setIsUpdatingApiKeys] = useState(false);
  const [createApiKey] = useLazyCreateApiKey();
  const [deleteApiKey] = useLazyDeleteApiKey();
  const { data: apiKeys } = useGetApiKeys(user.id);

  const handleGenerateApiKey = async () => {
    try {
      setIsUpdatingApiKeys(true);
      await createApiKey(user.id).unwrap();
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingApiKeys(false);
  };

  const handleDeleteApiKey = async (apiKey: string) => {
    try {
      setIsUpdatingApiKeys(true);
      await deleteApiKey({ apiKey, userId: user.id }).unwrap();
    } catch (error) {
      console.error(error);
    }
    setIsUpdatingApiKeys(false);
  };

  return (
    <Stack spacing={3} sx={{ p: 3 }} alignItems="flex-start">
      {!user.isActive && (
        <Paper
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
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
            <Typography variant="h6" color="error" component="h1">
              ACCOUNT SUSPENDED
            </Typography>
          </Stack>
        </Paper>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <Typography variant="h4" color="GrayText" textAlign="left">
          {user.name.toLocaleUpperCase()}
        </Typography>
        <Paper
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            minWidth: "500px",
          }}
          variant="outlined"
        >
          {user.isAdmin && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ pb: 1 }}
            >
              <SupervisorAccount color="primary" />
              <Typography variant="h6" color="primary" component="h1">
                ADMIN
              </Typography>
            </Stack>
          )}
          <InfoText title="Email" value={user.email} />
          <InfoText
            title="Language"
            value={user.languageCode.toLocaleUpperCase()}
          />
        </Paper>
      </Box>
      {user.roles.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h6" color="GrayText" sx={{ mb: 1 }}>
            Roles
          </Typography>
          <Stack direction="row" spacing={1}>
            {user.roles.map((role) => {
              return (
                <Paper
                  sx={{ py: 0.5, px: 1, userSelect: "none" }}
                  variant="outlined"
                >
                  <Typography variant="subtitle2" color="GrayText">
                    {role}
                  </Typography>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      )}
      <Stack alignItems="flex-start">
        <Stack direction="row" alignItems="center" spacing={3}>
          <Key color="primary" />
          <Typography variant="h6" color="GrayText" sx={{ mb: 1 }}>
            API Keys
          </Typography>
          <Button
            onClick={handleGenerateApiKey}
            disabled={apiKeys && apiKeys.length >= 3}
          >
            Generate Key
          </Button>
        </Stack>
        {apiKeys?.map((apiKey) => (
          <Stack
            key={apiKey.key}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <IconButton
              color="error"
              onClick={() => handleDeleteApiKey(apiKey.key)}
            >
              <Delete />
            </IconButton>
            <Typography display="inline">{apiKey.key}</Typography>
          </Stack>
        ))}
      </Stack>
      <DelayedSnackbar open={isUpdatingApiKeys} message="Updating..." />
    </Stack>
  );
};

const InfoText = ({ title, value }: { title: string; value: string }) => {
  return (
    <Box sx={{ py: 0.5 }}>
      <Typography display="inline" fontWeight="bold">
        {title}
        {": "}
      </Typography>
      <Typography display="inline">{value}</Typography>
    </Box>
  );
};

export default ProfileView;
