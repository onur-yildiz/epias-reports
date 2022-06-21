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
    getApiKeys: builder.query<ApiKey[], string>({
      query: (userId) => ({
        url: `${UE.Users}/${userId}/api-keys`,
      }),
      providesTags: ["api-keys"],
    }),
    createApiKey: builder.mutation<string, string>({
      query: (userId) => ({
        url: `${UE.Users}/${userId}/api-keys/create`,
        method: "POST",
        responseHandler: "text",
      }),
      invalidatesTags: ["api-keys"],
    }),
    deleteApiKey: builder.mutation<void, UserUpdateParams<DeleteApiKeyBody>>({
      query: (params) => ({
        url: `${UE.Users}/${params.userId}/api-keys`,
        method: "DELETE",
        body: params.body,
      }),
      invalidatesTags: ["api-keys"],
    }),
    updateAccountRoles: builder.mutation<
      void,
      UserUpdateParams<UpdateRolesBody>
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
      UserUpdateParams<UpdateIsActiveBody>
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
  useGetApiKeysQuery: useGetApiKeys,
  useCreateApiKeyMutation: useLazyCreateApiKey,
  useDeleteApiKeyMutation: useLazyDeleteApiKey,
  useRegisterMutation: useLazyRegister,
  useUpdateAccountRolesMutation: useLazyUpdateAccountRoles,
  useUpdateAccountIsActiveMutation: useLazyUpdateAccountIsActive,
  useGetUsersQuery: useGetUsers,
} = userApi;

export default userApi;
