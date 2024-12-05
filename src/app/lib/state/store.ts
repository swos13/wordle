"use client";

import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";
import statsReducer from "./stats/statsSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
