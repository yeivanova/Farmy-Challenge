import { configureStore } from "@reduxjs/toolkit";
import initialDataReducer from "../slices/initialDataSlice";
import composeOrderReducer from "../slices/composeOrderSlice";

export const store = configureStore({
  reducer: {
    initialData: initialDataReducer,
    order: composeOrderReducer
  },
});