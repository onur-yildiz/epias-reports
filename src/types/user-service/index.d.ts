interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

interface UserUpdateParams<T> {
  userId: string;
  body: T;
}

interface DeleteApiKeyBody {
  apiKey: string;
}

interface BaseUser {
  email: string;
  id: string;
  name: string;
  isActive: boolean;
  isAdmin: boolean;
  languageCode: string;
  roles: string[];
}

interface AuthUser extends BaseUser {
  token: string;
}

interface ApiKey {
  userId: string;
  appName: string;
  key: string;
}
