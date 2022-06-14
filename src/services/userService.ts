import baseApi from "./baseApiService";

enum UE { // User Endpoints
  Login = "user/login",
  RefreshToken = "user/refreshtoken",
  Register = "user/register",
  UpdateRoles = "user/updateroles",
  UpdateIsActive = "user/updateisactive",
  All = "user/all",
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: UE.Login,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    refreshToken: builder.mutation<User, void>({
      query: () => ({
        url: UE.RefreshToken,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: UE.Register,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    updateAccountRoles: builder.mutation<void, UserRoleParams>({
      query: (params) => ({
        url: UE.UpdateRoles,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["user-status"],
    }),
    updateAccountIsActive: builder.mutation<any, UpdateIsActiveParams>({
      query: (params) => ({
        url: UE.UpdateIsActive,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["user-status"],
    }),
    getUsers: builder.query<AdminServicableUserData[], void>({
      query: () => ({ url: UE.All, method: "GET" }),
      providesTags: ["user-status"],
    }),
  }),
});

export const {
  useLoginMutation: useLazyLogin,
  useRefreshTokenMutation: useLazyRefreshToken,
  useRegisterMutation: useLazyRegister,
  useUpdateAccountRolesMutation: useLazyUpdateAccountRoles,
  useUpdateAccountIsActiveMutation: useLazyUpdateAccountIsActive,
  useGetUsersQuery: useGetUsers,
} = userApi;

export default userApi;
