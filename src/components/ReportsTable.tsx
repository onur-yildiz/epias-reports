import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-enterprise";

import { ColDef, GridOptions, RowNode } from "ag-grid-enterprise";
import { Fragment, useState } from "react";
import {
  useGetReports,
  useLazyUpdateReportRoles,
  useUpdateReportIsActive,
} from "../services/reportService";

import { AgGridReact } from "ag-grid-react";
import Box from "@mui/material/Box";
import DelayedSnackbar from "./DelayedSnackbar";
import RoleSelectDialog from "./RoleSelectDialog";

const ReportsTable = () => {
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [selectedReportRoles, setSelectedReportRoles] = useState<string[]>([]);
  const [activeRow, setActiveRow] = useState<RowNode | null>();
  const [updateRoles, { isLoading: isLoadingRoles }] =
    useLazyUpdateReportRoles();
  const [updateIsActive, { isLoading: isLoadingIsActive }] =
    useUpdateReportIsActive();
  const { data } = useGetReports();

  const trueFalseSelector = (_: any) => ({
    component: "agRichSelect",
    params: { values: [true, false] },
    popup: true,
  });

  const onRoleSelectionClose = async (roles?: string[]) => {
    if (roles) {
      try {
        await updateRoles({
          key: activeRow?.data?.key,
          body: { roles },
        }).unwrap();
        activeRow?.setDataValue("roles", roles);
      } catch (error) {
        console.error(error);
      }
    }

    setIsRoleSelectOpen(false);
  };

  const [columnDefs] = useState<ColDef[]>([
    { field: "key", flex: 1 },
    {
      field: "name",
      cellRenderer: (params: any) => {
        return params.data.name[0].short;
      },
      flex: 1,
    },
    {
      field: "roles",
      onCellClicked: (event) => {
        setIsRoleSelectOpen(true);
        setSelectedReportRoles([...event.data.roles]);
        setActiveRow(event.node);
      },
      cellRenderer: (params: any) => {
        if (params.data.roles.length === 0) return "-";
        else return params.data.roles.join(", ");
      },
      flex: 1,
    },
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
            key: event.data.key,
            body: { isActive: event.newValue },
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
        id="reports-role-select-dialog"
        keepMounted
        open={isRoleSelectOpen}
        onClose={onRoleSelectionClose}
        roles={selectedReportRoles}
        isLoading={isLoadingRoles}
      />
      <DelayedSnackbar
        open={isLoadingIsActive}
        message="Updating report state..."
      />
    </Fragment>
  );
};

export default ReportsTable;
