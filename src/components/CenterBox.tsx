import Box from "@mui/material/Box";
import { PropsWithChildren } from "react";

const CenterBox = (props: PropsWithChildren<any>) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Box>
  );
};

export default CenterBox;
