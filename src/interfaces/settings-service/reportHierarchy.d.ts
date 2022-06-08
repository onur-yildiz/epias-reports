interface FolderRoute {
  order: number;
  folderName: LocalizedName[];
  children: ReportHierarchyItem[];
}

interface ReportRoute {
  order: number;
  reportKey: ReportKey;
  reportName: LocalizedName[];
  path: string;
}
