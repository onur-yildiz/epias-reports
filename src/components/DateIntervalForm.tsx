import { FC, FormEvent, useState } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

interface DateInputProps {
  onSubmit: (startDate: Date, endDate: Date) => void;
}

const DateIntervalForm: FC<DateInputProps> = (props: DateInputProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startDate && endDate && props.onSubmit(startDate, endDate);
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
          renderInput={(params) => <TextField {...params} error={!startDate} />}
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
          renderInput={(params) => <TextField {...params} error={!endDate} />}
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
