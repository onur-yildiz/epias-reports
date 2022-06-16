import { useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useGetRoles } from "../services/rolesService";

export interface RowSelectDialogProps {
  id: string;
  keepMounted: boolean;
  roles: string[];
  open: boolean;
  isLoading: boolean;
  onClose: (roles?: string[]) => void;
}

export default function RoleSelectDialog(props: RowSelectDialogProps) {
  const { data: allRoles } = useGetRoles();
  const { onClose, roles: RolesProp, open, ...other } = props;
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const formGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      setSelectedRoles([...RolesProp]);
    }
  }, [RolesProp, open]);

  const handleEntering = () => {
    if (formGroupRef.current != null) {
      formGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(selectedRoles);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const role = (event.target as HTMLInputElement).name;
    if (selectedRoles.includes(role))
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    else setSelectedRoles([...selectedRoles, role]);
  };

  if (!allRoles) return null;
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Roles</DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          {allRoles.map((role, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedRoles.includes(role.name)}
                    onChange={handleChange}
                    name={role.name}
                  />
                }
                label={role.name}
              />
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        {props.isLoading ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleOk}>Ok</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
