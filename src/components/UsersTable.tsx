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
import RoleSelectDialog from "./RoleSelectDialog";

const UsersTable = () => {
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState<RowNode | null>();
  const [updateIsActive] = useLazyUpdateAccountIsActive();
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
      const prevRoles = activeRow?.data.roles;
      activeRow?.setDataValue("roles", roles);
      try {
        await updateRoles({
          assigneeEmail: activeRow?.data?.email,
          roles,
        }).unwrap();
      } catch (error) {
        activeRow?.setDataValue("roles", prevRoles);
      }
    }

    setIsRoleSelectOpen(false);
  };

  const [columnDefs] = useState<ColDef[]>([
    { field: "name" },
    { field: "email" },
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
    },
    { field: "isAdmin" },
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
          event.node.setDataValue("isActive", event.newValue);
          await updateIsActive({
            assigneeEmail: event.data.email,
            isActive: event.newValue,
          }).unwrap();
        } catch (error) {
          event.node.setDataValue("isActive", event.oldValue);
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
    </Fragment>
  );
};

export default UsersTable;
