import CenterBox from "./CenterBox";
import Inbox from "@mui/icons-material/Inbox";
import LoadingView from "./LoadingView";
import { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";

interface Status {
  isDataUnavailable?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
}

interface StatusWrapperProps {
  status: Status;
}

const getStatus = ({
  isDataUnavailable,
  isFetching,
  isLoading,
  isError,
}: Status): QueryStatus => {
  if (isFetching) return "fetching";
  if (isDataUnavailable) return "unavailable";
  if (isLoading) return "loading";
  if (isError) return "error";
};

const StatusWrapper = (props: PropsWithChildren<StatusWrapperProps>) => {
  const render = (): JSX.Element => {
    switch (getStatus(props.status)) {
      case "unavailable":
        return (
          <CenterBox>
            <Inbox color="disabled" fontSize="large" />
          </CenterBox>
        );
      case "loading":
      case "fetching":
        return <LoadingView />;
      case "error":
        return (
          <Typography variant="h6" color="error">
            Error occured during fetching data
          </Typography>
        );

      default:
        return <div>{props.children}</div>;
    }
  };

  return render();
};

export default StatusWrapper;
