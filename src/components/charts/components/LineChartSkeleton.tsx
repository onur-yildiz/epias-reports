import Skeleton from "@mui/material/Skeleton";

const LineChartSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      animation="wave"
      style={{ width: "100%", height: "30vw" }} // scale height with screen width like responsive <Line/>
    />
  );
};

export default LineChartSkeleton;
