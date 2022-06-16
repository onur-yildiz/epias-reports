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
    logout: (_) => {
      window.localStorage.removeItem("token");
      return initialState;
    },
  },
});

export const { setUser, logout } = reportSlice.actions;

export default reportSlice.reducer;
