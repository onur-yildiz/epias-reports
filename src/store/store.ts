import authReducer from "./authSlice";
import baseApi from "../services/baseApiService";
import { configureStore } from "@reduxjs/toolkit";
import paramSlice from "./paramSlice";
import reportReducer from "./reportSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    param: paramSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
