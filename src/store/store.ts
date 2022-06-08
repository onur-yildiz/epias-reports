import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import paramSlice from "./paramSlice";
import reportApi from "../services/reportService";
import reportReducer from "./reportSlice";
import settingsApi from "../services/settingsService";
import userApi from "../services/userService";

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    param: paramSlice,
    [userApi.reducerPath]: userApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      reportApi.middleware,
      settingsApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
