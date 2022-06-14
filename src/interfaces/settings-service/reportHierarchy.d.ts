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
