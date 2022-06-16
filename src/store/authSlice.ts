import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser;
}

const initialState: AuthState = {
  user: {
    id: "",
    name: "",
    email: "",
    languageCode: "",
    isActive: true,
    isAdmin: false,
    roles: [],
    apiKeys: [],
    token: window.localStorage.getItem("token") ?? "",
  },
  isAuthenticated: false,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      window.localStorage.setItem("token", state.user.token);
    },
    addApiKey: (state, action: PayloadAction<string>) => {
      state.user.apiKeys.push(action.payload);
    },
    removeApiKey: (state, action: PayloadAction<string>) => {
      state.user.apiKeys = state.user.apiKeys.filter(
        (key) => key !== action.payload
      );
    },
    logout: (_) => {
      window.localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setUser, logout, addApiKey, removeApiKey } = reportSlice.actions;

export default reportSlice.reducer;
