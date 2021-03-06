type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type ReportHierarchyItem = XOR<FolderRoute, ReportRoute>;

type ReportKey = DateIntervalReportKey | "dpp" | "dpporg" | "dppiun";

type DateIntervalReportKey =
  | "dam-mcp"
  | "idm-wap"
  | "idm-mq"
  | "idm-sum"
  | "bpm-smp"
  | "rtg";

type PresentedReportKey =
  | "dam-mcp"
  | "idm-wap"
  | "idm-mq"
  | "dpp"
  | "bpm-smp"
  | "rtg";

type QueryStatus = "unavailable" | "loading" | "fetching" | "error" | undefined;

interface UpdateRolesBody {
  roles: string[];
}

interface UpdateIsActiveBody {
  isActive: boolean;
}

interface ApiResponse<T> {
  responseCode: number;
  message: string;
  value: T;
}

interface ReportProps {
  static?: boolean;
}
