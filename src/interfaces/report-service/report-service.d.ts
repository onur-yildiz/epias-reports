interface DateInterval {
  startDate: string;
  endDate: string;
}

interface DateIntervalPeriodic extends DateInterval {
  period: string;
}

interface DppParams extends DateInterval {
  organizationEIC: string;
  uevcbEIC: string;
}

interface ReportUpdateParams<T> {
  key: string;
  body: T;
}

interface ReportUpdateRolesBody {
  roles: string[];
}

interface ReportUpdateIsActiveBody {
  isActive: boolean;
}

interface FolderRoute {
  order: string;
  name: LocalizedName[];
  children?: ReportHierarchyItem[];
}

interface ReportRoute {
  order: string;
  key: ReportKey;
  roles: string[];
  name: LocalizedName[];
  isActive: boolean;
}

interface ReportKeyProps {
  reportKey: string;
}

interface LocalizedName {
  lang: string;
  short: string;
  long: string;
}
