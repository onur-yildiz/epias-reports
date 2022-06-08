import Grid, { GridProps } from "@mui/material/Grid";

import Paper from "@mui/material/Paper";
import { PropsWithChildren } from "react";
import Stack from "@mui/material/Stack";

interface CustomMuiGridProps {
  variant?: "large" | "medium" | "small";
  direction?: "row" | "column";
}

const CustomMuiGrid = (props: PropsWithChildren<CustomMuiGridProps>) => {
  const getVariantProps = () => {
    switch (props.variant) {
      case "large":
        return largeGridProps;
      case "medium":
        return mediumGridProps;
      case "small":
        return smallGridProps;
      default:
        return {};
    }
  };

  return (
    <Grid item {...getVariantProps()}>
      <Paper sx={{ p: 2 }}>
        <Stack
          direction={props.direction}
          spacing={3}
          justifyContent="space-between"
        >
          {props.children}
        </Stack>
      </Paper>
    </Grid>
  );
};

const largeGridProps: GridProps = { xs: 12 };
const mediumGridProps: GridProps = { xs: 12, sm: 8, md: 6 };
const smallGridProps: GridProps = { xs: 12, sm: 2, md: 3 };

export default CustomMuiGrid;
