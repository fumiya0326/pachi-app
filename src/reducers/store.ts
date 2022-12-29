import { configureStore } from "@reduxjs/toolkit";

import handReducer from './hands'

export const store = configureStore({
  reducer: {
    handsState: handReducer
  }
});