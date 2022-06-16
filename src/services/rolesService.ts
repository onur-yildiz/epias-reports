import baseApi from "./baseApiService";

enum SE { // Settings Endpoints
  Roles = "/roles",
}

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => SE.Roles,
      providesTags: ["role-status"],
    }),
    getRole: builder.query<Role, Role>({
      query: (role) => `${SE.Roles}/${role.name}`,
      providesTags: ["role-status"],
    }),
    createRole: builder.mutation<void, Role>({
      query: (role) => ({
        url: SE.Roles,
        method: "POST",
        body: role,
      }),
      invalidatesTags: ["role-status"],
    }),
    removeRole: builder.mutation<void, Role>({
      query: (role) => ({
        url: `${SE.Roles}/${role.name}`,
        method: "DELETE",
      }),
      invalidatesTags: ["report-status", "user-status", "role-status"],
    }),
  }),
});

export const {
  useGetRolesQuery: useGetRoles,
  useCreateRoleMutation: useCreateRole,
  useRemoveRoleMutation: useRemoveRole,
} = rolesApi;

export default rolesApi;
