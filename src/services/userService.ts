import baseApi from "./baseApiService";

enum UE { // User Endpoints
  Users = "users",
  Login = "users/login",
  Register = "users/register",
  RefreshToken = "users/refresh-token",
}

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<BaseUser[], void>({
      query: () => ({ url: UE.Users, method: "GET" }),
      providesTags: ["user-status"],
    }),
    login: builder.mutation<AuthUser, LoginCredentials>({
      query: (credentials) => ({
        url: UE.Login,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    register: builder.mutation<AuthUser, RegisterCredentials>({
      query: (credentials) => ({
        url: UE.Register,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    refreshToken: builder.mutation<AuthUser, void>({
      query: () => ({
        url: UE.RefreshToken,
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),
    updateAccountRoles: builder.mutation<
      void,
      UserUpdateParams<UserUpdateRolesBody>
    >({
      query: (params) => ({
        url: `${UE.Users}/${params.userId}/roles`,
        method: "PATCH",
        body: params.body,
      }),
      invalidatesTags: ["user-status"],
    }),
    updateAccountIsActive: builder.mutation<
      any,
      UserUpdateParams<UserUpdateIsActiveBody>
    >({
      query: (params) => ({
        url: `${UE.Users}/${params.userId}/is-active`,
        method: "PATCH",
        body: params.body,
      }),
      invalidatesTags: ["user-status"],
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
