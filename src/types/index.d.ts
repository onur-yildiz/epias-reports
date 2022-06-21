type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type ReportHierarchyItem = XOR<FolderRoute, ReportRoute>;

type ReportKey =
  | "dam-mcp"
  | "idm-wap"
  | "idm-mq"
  | "idm-sum"
  | "bpm-smp"
  | "fdpp"
  | "rtg"
  | "dpporg"
  | "dppiun";

type DateIntervalReportKey =
  | "dam-mcp"
  | "idm-wap"
  | "idm-mq"
  | "idm-sum"
  | "bpm-smp"
  | "fdpp"
  | "rtg";

interface UpdateRolesBody {
  roles: string[];
}

interface UpdateIsActiveBody {
  isActive: boolean;
}
