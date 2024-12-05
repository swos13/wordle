import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result, Stats } from "../../types";

const initialState: Stats = {
  avgGuesses: 0,
  wordsGuessed: 0,
  totalWords: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (_, action: PayloadAction<Stats>) => {
      return action.payload;
    },

    updateStats: (state, action: PayloadAction<Result>) => {
      let { wordsGuessed, totalWords, avgGuesses } = state;
      if (action.payload.guessed) wordsGuessed++;
      avgGuesses =
        Math.floor(
          ((avgGuesses * totalWords + action.payload.numberOfGuesses) /
            (totalWords + 1)) *
            100
        ) / 100;
      totalWords++;
      return {
        wordsGuessed,
        avgGuesses,
        totalWords,
      };
    },
  },
});

export const { setStats, updateStats } = statsSlice.actions;

export default statsSlice.reducer;
