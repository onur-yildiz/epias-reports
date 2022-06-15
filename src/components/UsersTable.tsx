import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";

import { ColDef, GridOptions, RowNode } from "ag-grid-enterprise";
import { Fragment, useState } from "react";
import {
  useGetUsers,
  useLazyUpdateAccountIsActive,
  useLazyUpdateAccountRoles,
} from "../services/userService";

import { AgGridReact } from "ag-grid-react";
import Box from "@mui/material/Box";
import DelayedSnackbar from "./DelayedSnackbar";
import RoleSelectDialog from "./RoleSelectDialog";

const UsersTable = () => {
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState<RowNode | null>();
  const [updateIsActive, { isLoading: isLoadingIsActive }] =
    useLazyUpdateAccountIsActive();
  const [updateRoles, { isLoading: isLoadingRoles }] =
    useLazyUpdateAccountRoles();
  const { data } = useGetUsers();

  const trueFalseSelector = (_: any) => ({
    component: "agRichSelect",
    params: { values: [true, false] },
    popup: true,
  });

  const onRoleSelectionClose = async (roles?: string[]) => {
    if (roles) {
      try {
        await updateRoles({
          assigneeEmail: activeRow?.data?.email,
          roles,
        }).unwrap();
        activeRow?.setDataValue("roles", roles);
      } catch (error) {
        console.error(error);
      }
    }

    setIsRoleSelectOpen(false);
  };

  const [columnDefs] = useState<ColDef[]>([
    { field: "name", flex: 1 },
    { field: "email", flex: 1 },
    {
      field: "roles",
      onCellClicked: (event) => {
        setIsRoleSelectOpen(true);
        setSelectedUserRoles([...event.data.roles]);
        setActiveRow(event.node);
      },
      cellRenderer: (params: any) => {
        if (params.data.roles.length === 0) return "-";
        else return params.data.roles.join(", ");
      },
      flex: 1,
    },
    { field: "isAdmin", flex: 1 },
    {
      field: "isActive",
      editable: true,
      cellEditorSelector: trueFalseSelector,
      flex: 1,
    },
  ]);

  const gridOptions: GridOptions = {
    columnDefs,
    readOnlyEdit: true,
    onCellEditRequest: async (event) => {
      if (event.colDef.field === "isActive") {
        try {
          await updateIsActive({
            assigneeEmail: event.data.email,
            isActive: event.newValue,
          }).unwrap();
          event.node.setDataValue("isActive", event.newValue);
        } catch (error) {
          console.error(error);
        }
      }
    },
  };

  const rowData = [...(data?.map((item) => ({ ...item })) ?? [])];
  return (
    <Fragment>
      <Box
        sx={{
          textAlign: "left",
          width: "100%",
          height: "93vh",
        }}
        className="ag-theme-material"
      >
        <AgGridReact gridOptions={gridOptions} rowData={rowData} />
      </Box>
      <RoleSelectDialog
        id="users-role-select-dialog"
        keepMounted
        open={isRoleSelectOpen}
        onClose={onRoleSelectionClose}
        roles={selectedUserRoles}
        isLoading={isLoadingRoles}
      />
      <DelayedSnackbar
        open={isLoadingIsActive}
        message="Updating user state..."
      />
    </Fragment>
  );
};

export default UsersTable;
