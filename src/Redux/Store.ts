import { configureStore } from "@reduxjs/toolkit";
import KeyReducer from "./KeySlice";
export const store = configureStore({
  reducer: { key: KeyReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
