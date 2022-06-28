import { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

import Button from "@mui/material/Button";
import DateIntervalInput from "./DateIntervalInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import format from "date-fns/format";
import { setDateIntervalParams } from "../store/paramSlice";

interface DateIntervalFormProps {
  reportKey: DateIntervalReportKey;
}

const DateIntervalForm: FC<DateIntervalFormProps> = (
  props: DateIntervalFormProps
) => {
  const dispatch = useAppDispatch();
  const params = useAppSelector(
    (state) => state.param.dateIntervalParams[props.reportKey]
  );

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
          key: props.reportKey,
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
