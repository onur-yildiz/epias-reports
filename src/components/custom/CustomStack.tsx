import Stack, { StackProps } from "@mui/material/Stack";

import Paper from "@mui/material/Paper";
import { PropsWithChildren } from "react";

interface CustomMuiGridProps extends StackProps {
  component?: "form";
  disablePaper?: boolean;
}

const CustomStack = (props: PropsWithChildren<CustomMuiGridProps>) => {
  const child = (
    <Stack
      // component={props.component ?? "div"}
      onSubmit={props.onSubmit}
      direction={props.direction}
      spacing={2}
      justifyContent="space-between"
      {...Object.fromEntries(
        Object.entries(props).filter(([key]) => !["disablePaper"].includes(key))
      )}
    >
      {props.children}
    </Stack>
  );
  return props.disablePaper ? (
    child
  ) : (
    <Paper sx={{ p: 2, overflow: "auto" }}>{child}</Paper>
  );
};

export default CustomStack;
