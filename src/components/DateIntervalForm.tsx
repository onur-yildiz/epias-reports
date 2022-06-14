import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import format from "date-fns/format";
import { setDateIntervalParams } from "../store/paramSlice";

const DateIntervalForm = () => {
  const dispatch = useAppDispatch();
  const [reportKey, params] = useAppSelector((state) => {
    const activeKey = state.param.activeReportKey as DateIntervalReportKey;
    return [activeKey, state.param.dateIntervalParams[activeKey]];
  });

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(params.startDate)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date(params.endDate));

  useEffect(() => {
    setStartDate(new Date(params.startDate));
    setEndDate(new Date(params.endDate));
  }, [params]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startDate &&
      endDate &&
      dispatch(
        setDateIntervalParams({
          key: reportKey,
          params: {
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
          },
        })
      );
  };

  return (
    <Stack
      direction="row"
      alignItems="strech"
      spacing={3}
      component="form"
      onSubmit={handleSubmit}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          shouldDisableDate={(date: Date) => !endDate || date > endDate}
          disableFuture
          onChange={(newValue) => {
            newValue && setStartDate(newValue);
          }}
          onError={() => {
            setStartDate(null);
          }}
          renderInput={(p) => <TextField {...p} error={!startDate} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            // check if newDate is in the future
            if (!newValue) return;

            setEndDate(newValue);
          }}
          onError={() => {
            setEndDate(null);
          }}
          renderInput={(p) => <TextField {...p} error={!endDate} />}
        />
      </LocalizationProvider>
      <Button
        disabled={!startDate || !endDate}
        type="submit"
        size="large"
        variant="contained"
        disableElevation
      >
        Apply
      </Button>
    </Stack>
  );
};

export default DateIntervalForm;
