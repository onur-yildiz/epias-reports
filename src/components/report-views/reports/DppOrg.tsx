import CustomAgGridTable from "../../custom/CustomAgGridTable";
import CustomStack from "../../custom/CustomStack";
import StatusWrapper from "../../StatusWrapper";
import { useGetDppOrganization } from "../../../services/reportService";

const DppOrg = () => {
  const { data, isLoading, isError, isFetching } = useGetDppOrganization();

  return (
    <CustomStack disablePaper>
      <StatusWrapper
        status={{ isDataUnavailable: !data, isLoading, isFetching, isError }}
      >
        {data && <CustomAgGridTable data={data.organizations} />}
      </StatusWrapper>
    </CustomStack>
  );
};

export default DppOrg;
