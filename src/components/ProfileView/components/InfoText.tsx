import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const InfoText = (props: { title: string; value: string }) => {
  const { title, value } = props;
  return (
    <Box>
      <Typography display="inline" fontWeight="bold">
        {title}
        {": "}
      </Typography>
      <Typography display="inline">{value}</Typography>
    </Box>
  );
};

export default InfoText;
