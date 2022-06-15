import Snackbar from "@mui/material/Snackbar";

const DelayedSnackbar = ({
  open,
  message,
}: {
  open: boolean;
  message: string;
}) => {
  return (
    <Snackbar
      open={open}
      TransitionProps={{
        onEnter: (node) => (node.style.opacity = "0"),
        onEntering: (node) => (node.style.opacity = "0"),
        onEntered: (node) => (node.style.opacity = "1"),
      }}
      transitionDuration={{ enter: 1000 }}
      message={message}
    />
  );
};

export default DelayedSnackbar;
