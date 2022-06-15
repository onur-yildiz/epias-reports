import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

const ListSkeleton = () => {
  return (
    <List>
      {new Array(15).fill(null).map((_, index) => (
        <Skeleton
          variant="rectangular"
          sx={{
            m: 1,
            height: "36px",
            ml: index % 3 !== 0 ? 3 : 1,
          }}
        />
      ))}
    </List>
  );
};

export default ListSkeleton;
