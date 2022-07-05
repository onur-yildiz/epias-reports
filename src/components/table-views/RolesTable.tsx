import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";

import { BaseSyntheticEvent, LegacyRef, useRef, useState } from "react";
import { ColDef, GridApi, GridOptions } from "ag-grid-enterprise";
import {
  useCreateRole,
  useGetRoles,
  useRemoveRole,
} from "../../services/rolesService";

import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import DelayedSnackbar from "../DelayedSnackbar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const RolesTable = () => {
  const gridRef = useRef() as LegacyRef<AgGridReact> | undefined;
  const { data: roles } = useGetRoles();
  const [removeRole, { isLoading: isLoadingRemoveRole }] = useRemoveRole();
  const [createRole, { isLoading: isLoadingCreateRole }] = useCreateRole();
  const [columnDefs] = useState<ColDef[]>([
    { field: "name", editable: true, flex: 1 },
  ]);

  const gridOptions: GridOptions = {
    columnDefs,
    readOnlyEdit: true,
  };

  const handleDelete = async () => {
    const gridApi = (gridRef as any)?.current?.api as GridApi | undefined;
    const selectedRole = gridApi?.getSelectedRows()[0] as Role;
    try {
      await removeRole(selectedRole).unwrap();
      gridApi?.applyTransaction({ remove: [selectedRole] });
    } catch (error) {
      console.error(error);
    }
  };

  const rowData = [...(roles?.map((item) => ({ ...item })) ?? [])];
  return (
    <Stack
      sx={{
        textAlign: "left",
        width: "100%",
        height: "93vh",
      }}
      className="ag-theme-material"
    >
      <Paper variant="outlined">
        <Stack direction="row" sx={{ m: 1 }} justifyContent="space-between">
          {gridRef && (
            <AddRoleForm
              gridApi={(gridRef as any).current?.api}
              onAdd={createRole}
            />
          )}
          <Button
            variant="contained"
            color="error"
            disableElevation
            onClick={handleDelete}
          >
            delete selected
          </Button>
        </Stack>
      </Paper>
      <AgGridReact
        ref={gridRef}
        gridOptions={gridOptions}
        rowData={rowData}
        rowSelection="single"
        isRowSelectable={() => true}
      />
      <DelayedSnackbar
        open={isLoadingRemoveRole || isLoadingCreateRole}
        message="Updating roles..."
      />
    </Stack>
  );
};

const AddRoleForm = ({ gridApi, onAdd }: { gridApi: GridApi; onAdd: any }) => {
  const [newRoleValue, setNewRoleValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = newRoleValue.trim();
    if (name.length === 0) return;
    try {
      await onAdd({ name: name }).unwrap();
      gridApi.applyTransaction({
        add: [{ name: name }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    setNewRoleValue(e.target.value);
  };

  return (
    <Stack component="form" direction="row" onSubmit={handleSubmit}>
      <TextField value={newRoleValue} onChange={handleChange} />
      <Button
        type="submit"
        variant="contained"
        disableElevation
        sx={{ alignSelf: "start", mx: 1, height: "100%" }}
      >
        add role
      </Button>
    </Stack>
  );
};

export default RolesTable;
