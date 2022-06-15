import baseApi from "./baseApiService";

enum SE { // Settings Endpoints
  Roles = "/settings/roles",
  Role = "/settings/role",
}

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => SE.Roles,
      providesTags: ["role-status"],
    }),
    createRole: builder.mutation<void, Role>({
      query: (params) => ({
        url: SE.Role,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["role-status"],
    }),
    removeRole: builder.mutation<void, Role>({
      query: (params) => ({
        url: SE.Role,
        method: "DELETE",
        body: params,
      }),
      invalidatesTags: ["report-status", "user-status", "role-status"],
    }),
  }),
});

export const {
  useGetRolesQuery: useGetRoles,
  useCreateRoleMutation: useCreateRole,
  useRemoveRoleMutation: useRemoveRole,
} = settingsApi;

export default settingsApi;
