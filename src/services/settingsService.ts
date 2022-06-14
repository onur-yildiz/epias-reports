import baseApi from "./baseApiService";

enum SE { // Settings Endpoints
  Roles = "/settings/roles",
}

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => SE.Roles,
      providesTags: ["auth"],
    }),
  }),
});

export const { useGetRolesQuery: useGetRoles } = settingsApi;

export default settingsApi;
