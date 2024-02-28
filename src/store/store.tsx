import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users";
import { Api } from "../services/api";

const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

export default store;
