interface User extends AdminServicableUserData {
  token: string;
}

interface AdminServicableUserData {
  email: string;
  id: string;
  name: string;
  isActive: boolean;
  isAdmin: boolean;
  languageCode: string;
  roles: string[];
}
