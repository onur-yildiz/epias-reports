import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker";
import { FC, Fragment } from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { startOfDay } from "date-fns";

interface DateIntervalInputProps {
  startDateProps: DatePickerProps<Date | null>;
  endDateProps: DatePickerProps<Date | null>;
}

const DateIntervalInput: FC<DateIntervalInputProps> = (
  props: DateIntervalInputProps
) => {
  const { startDateProps, endDateProps } = props;
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          disableFuture
          shouldDisableDate={(date) =>
            !endDateProps.value ||
            !date ||
            startOfDay(date) > endDateProps.value
          }
          {...startDateProps}
        />
        <DatePicker label="End Date" {...endDateProps} />
      </LocalizationProvider>
    </Fragment>
  );
};

export default DateIntervalInput;
