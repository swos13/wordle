"use client";

import { useEffect } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../lib/state/store";
import { setWord, changeLine, finish } from "../../lib/state/game/gameSlice";

type GameProps = {
  word: string;
};

export default function Game({ word }: GameProps) {
  const {
    word: wordToGuess,
    finished,
    currentLine,
  } = useSelector((state: RootState) => ({
    ...state.game,
    word,
  }));
  const dispatch = useDispatch();

  console.log(wordToGuess);

  useEffect(() => {
    dispatch(setWord(word));
  }, []);

  const submit = (guess: string) => {
    console.log("im finishing", currentLine, guess);
    if (guess.toUpperCase() === wordToGuess) {
      dispatch(finish());
    } else {
      dispatch(changeLine());
    }
  };
  console.log(finished);

  return (
    <section className="flex flex-col items-center gap-4">
      <button>New Word</button>
      <section className="w-full flex justify-around">
        <span className="flex flex-col items-center">
          <p>Words guessed</p>
          <h2>12/17</h2>
        </span>
        <span className="flex flex-col items-center">
          <p>Avg. guesses</p>
          <h2>4.6</h2>
        </span>
      </section>
      <section className="flex flex-col items-center gap-2">
        <button>Guess</button>
        {/* TODO: change text to show when not guessed right. Should depend on currentLine */}
        <h2>
          {!finished
            ? `Tries left: ${6 - currentLine}`
            : `Correct! The word is "${wordToGuess}". You guessed in ${
                currentLine + 1
              } tries.`}
        </h2>
        <Board word={word} submit={submit} />
      </section>
    </section>
  );
}
