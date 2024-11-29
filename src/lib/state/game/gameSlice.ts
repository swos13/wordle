"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  word: string;
  currentLine: number;
  finished: boolean;
}

const initialState: GameState = {
  word: "",
  currentLine: 0,
  finished: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    changeLine: (state) => {
      state.currentLine += 1;
    },
    finish: (state) => {
      state.finished = true;
    },
  },
});

export const { setWord, changeLine, finish } = gameSlice.actions;

export default gameSlice.reducer;
