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
      return { ...state, currentLine: state.currentLine + 1, guess: "" };
    },
    finish: (state) => {
      return { ...state, guess: "", finished: true };
    },
    reset: (state, action: PayloadAction<string>) => {
      return {
        word: action.payload,
        finished: false,
        currentLine: 0,
        guess: "",
      };
    },
  },
});

export const { setWord, setGuess, changeLine, finish, reset } =
  gameSlice.actions;

export default gameSlice.reducer;
