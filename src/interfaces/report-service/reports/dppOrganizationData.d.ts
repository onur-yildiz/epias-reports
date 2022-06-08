interface DppOrganizationData {
  organizations: Organization[];
}

interface Organization {
  organizationId: number;
  organizationName: string;
  organizationStatus: string;
  organizationETSOCode: string;
  organizationShortName: string;
}
