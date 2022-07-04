import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  useGetDppInjectionUnitName,
  useGetDppOrganization,
} from "../services/reportService";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CustomStack from "./custom/CustomStack";
import DateIntervalInput from "./DateIntervalInput";
import TextField from "@mui/material/TextField";
import format from "date-fns/format";
import { setDppParams } from "../store/paramSlice";

const DppForm = () => {
  const dispatch = useAppDispatch();
  const dppParams = useAppSelector((state) => state.param.dpp);

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(dppParams.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(dppParams.endDate)
  );

  const { data: dppOrgs } = useGetDppOrganization();
  const [organizationEIC, setOrganizationEIC] = useState<string>(
    dppOrgs?.organizations[0].organizationETSOCode ?? ""
  );

  const { data: dppIun, isError: isIunError } =
    useGetDppInjectionUnitName(organizationEIC);
  const [uevcbEIC, setUevcbEIC] = useState<string>(
    dppIun?.injectionUnitNames[0].eic ?? ""
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startDate &&
      endDate &&
      dispatch(
        setDppParams({
          startDate: format(startDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          organizationEIC: organizationEIC,
          uevcbEIC: uevcbEIC,
        })
      );
  };

  const onOrgChange = (_: any, value: Organization | null) => {
    setUevcbEIC("");
    dispatch(setDppParams({ ...dppParams, uevcbEIC: "" }));
    setOrganizationEIC(value?.organizationETSOCode ?? "");
  };

  return (
    <CustomStack component="form" onSubmit={handleSubmit} disablePaper>
      <CustomStack disablePaper direction="row" justifyContent="flex-start">
        <DateIntervalInput
          startDateProps={{
            value: startDate,
            onChange: (newValue) => {
              newValue && setStartDate(newValue);
            },
            onError: () => setStartDate(null),
            renderInput: (p) => <TextField {...p} error={!startDate} />,
          }}
          endDateProps={{
            value: endDate,
            onChange: (newValue) => {
              newValue && setEndDate(newValue);
            },
            onError: () => setEndDate(null),
            renderInput: (p) => <TextField {...p} error={!endDate} />,
          }}
        />
      </CustomStack>
      <CustomStack disablePaper>
        {dppOrgs?.organizations && (
          <Autocomplete
            sx={{ flexGrow: 1 }}
            disablePortal
            id="organization-eic-select"
            value={dppOrgs.organizations.find(
              (org) => org.organizationETSOCode === organizationEIC
            )}
            options={dppOrgs.organizations}
            getOptionLabel={(option) => option.organizationName}
            onChange={onOrgChange}
            renderInput={(params) => (
              <TextField {...params} label="Organization Name" />
            )}
          />
        )}

        <Autocomplete
          sx={{ flexGrow: 1 }}
          disablePortal
          id="dpp-iun-select"
          value={
            dppIun?.injectionUnitNames.find((iun) => iun.eic === uevcbEIC) ||
            null
          }
          options={isIunError ? [] : dppIun?.injectionUnitNames ?? []}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setUevcbEIC(value?.eic ?? "")}
          renderInput={(params) => <TextField {...params} label="UEVÇB Name" />}
        />

        <Button
          disabled={!startDate || !endDate}
          type="submit"
          size="large"
          variant="contained"
          disableElevation
        >
          Apply
        </Button>
      </CustomStack>
    </CustomStack>
  );
};

export default DppForm;
