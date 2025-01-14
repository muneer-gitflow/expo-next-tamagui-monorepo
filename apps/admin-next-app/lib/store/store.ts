import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import * as logger from "redux-logger";
import { cmsApi } from "@/lib/api/cms-api";

const createLogger = logger.createLogger;

export const store = configureStore({
  reducer: rootReducer,
  devTools: {
    name: "Gitspark App Builder",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    })
      .concat(cmsApi.middleware)
      .concat(
        createLogger
          ? createLogger()
          : () => (next: unknown) => (action: unknown) =>
              (next as unknown as any)(action),
      ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
