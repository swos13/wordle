"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  word: string;
  currentLine: number;
  finished: boolean;
  guess: string;
}

const initialState: GameState = {
  word: "",
  currentLine: 0,
  finished: false,
  guess: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setWord: (state, action: PayloadAction<string>) => {
      state.word = action.payload;
    },
    setGuess: (state, action: PayloadAction<string>) => {
      state.guess = action.payload;
    },
    changeLine: (state) => {
      state.currentLine += 1;
      state.guess = "";
    },
    finish: (state) => {
      state.finished = true;
    },
  },
});

export const { setWord, setGuess, changeLine, finish } = gameSlice.actions;

export default gameSlice.reducer;
