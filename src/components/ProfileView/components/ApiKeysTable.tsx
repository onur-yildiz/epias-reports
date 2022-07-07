import {
  useGetApiKeys,
  useLazyCreateApiKey,
  useLazyDeleteApiKey,
} from "../../../services/userService";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import DelayedSnackbar from "../../DelayedSnackbar";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppSelector } from "../../../hooks";
import { useState } from "react";

const ApiKeysTable = () => {
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
                <TableRow hover sx={{ ":hover": { cursor: "copy" } }}>
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

export default ApiKeysTable;
