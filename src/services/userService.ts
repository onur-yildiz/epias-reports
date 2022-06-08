import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "../store/store";

enum UE { // User Endpoints
  Login = "login",
  RefreshToken = "refreshtoken",
  Register = "register",
  AssignRole = "assignrole",
  RemoveRole = "removerole",
  UpdateIsActive = "updateisactive",
}

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5275/user/",
    method: "post",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user.token;

      if (token.length > 0) headers.set("Authorization", token);
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.query<User, LoginCredentials>({
      query: (credentials) => ({
        url: UE.Login,
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.query<User, void>({
      query: () => ({
        url: UE.RefreshToken,
        method: "POST",
      }),
    }),
    register: builder.query<User, RegisterCredentials>({
      query: (credentials) => ({
        url: UE.Register,
        method: "POST",
        body: credentials,
      }),
    }),
    assignRole: builder.query<any, RoleParams>({
      query: (params) => ({ url: UE.AssignRole, method: "POST", body: params }),
    }),
    removeRole: builder.query<any, RoleParams>({
      query: (params) => ({ url: UE.RemoveRole, method: "POST", body: params }),
    }),
    updateIsActive: builder.query<any, UpdateIsActiveParams>({
      query: (params) => ({
        url: UE.UpdateIsActive,
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery: useLazyLogin,
  useLazyRefreshTokenQuery: useLazyRefreshToken,
  useLazyRegisterQuery: useLazyRegister,
  useAssignRoleQuery: useAssignRole,
  useRemoveRoleQuery: useRemoveRole,
  useUpdateIsActiveQuery: useUpdateIsActive,
} = userApi;

export default userApi;
