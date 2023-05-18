import { configureStore } from "@reduxjs/toolkit";

import { sendMessageApi } from "./sendMessageApi";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: { authSlice, [sendMessageApi.reducerPath]: sendMessageApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sendMessageApi.middleware),
});

export default store;
