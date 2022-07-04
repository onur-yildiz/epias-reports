import CenterBox from "./CenterBox";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingView = () => {
  return (
    <CenterBox>
      <CircularProgress />
    </CenterBox>
  );
};

export default LoadingView;
