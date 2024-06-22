import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";

const rootReducer = {
  authData: authSlice,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;
