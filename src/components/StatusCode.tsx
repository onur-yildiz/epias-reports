import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const StatusCode = ({ value }: { value: number | string }) => {
  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="GrayText">{`${value}`}</Typography>
    </Container>
  );
};

export default StatusCode;
