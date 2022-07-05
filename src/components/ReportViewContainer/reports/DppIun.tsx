import { Fragment, useState } from "react";
import {
  useGetDppInjectionUnitName,
  useGetDppOrganization,
} from "../../../services/reportService";

import Autocomplete from "@mui/material/Autocomplete";
import CustomAgGridTable from "../../custom/CustomAgGridTable";
import CustomStack from "../../custom/CustomStack";
import StatusWrapper from "../../StatusWrapper";
import TextField from "@mui/material/TextField";

const DppIun = () => {
  const [organizationEIC, setOrganizationEIC] = useState<string | null>();
  const {
    data: dppIun,
    isLoading,
    isFetching,
    isError,
  } = useGetDppInjectionUnitName(organizationEIC ?? "");
  const { data: dppOrgs } = useGetDppOrganization();

  return (
    <Fragment>
      <CustomStack>
        <Autocomplete
          sx={{ flexGrow: 1 }}
          disablePortal
          id="dpp-iun-organization-eic-select"
          value={dppOrgs?.organizations.find(
            (org) => org.organizationETSOCode === organizationEIC
          )}
          options={dppOrgs?.organizations ?? []}
          getOptionLabel={(option) => option.organizationName}
          onChange={(_, value) =>
            setOrganizationEIC(value?.organizationETSOCode)
          }
          renderInput={(params) => (
            <TextField {...params} label="Organization Name" />
          )}
        />
        <StatusWrapper
          status={{
            isDataUnavailable: !dppIun,
            isLoading,
            isFetching,
            isError,
          }}
        >
          {dppIun && (
            <CustomAgGridTable height="75vh" data={dppIun.injectionUnitNames} />
          )}
        </StatusWrapper>
      </CustomStack>
    </Fragment>
  );
};

export default DppIun;
