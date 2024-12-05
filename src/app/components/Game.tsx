"use client";

import { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/state/store";
import {
  setWord,
  changeLine,
  finish,
  reset,
} from "../lib/state/game/gameSlice";
import Button from "./Button";
import useStats from "../hooks/useStats";

type GameProps = {
  word: string;
};

export default function Game({ word }: GameProps) {
  const {
    word: wordToGuess,
    finished,
    currentLine,
    //guess: guess,
  } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();
  const [isNewWord, setIsNewWord] = useState(false);

  const {
    wordsGuessed,
    totalWords,
    avgGuesses,
    update: updateStats,
  } = useStats();

  useEffect(() => {
    dispatch(setWord(word));
  }, []);

  useEffect(() => {
    if (isNewWord) {
      fetch("/api/word")
        .then((resp) => resp.json())
        .then((newWord) => {
          dispatch(reset(newWord));
          setIsNewWord(false);
        });
    }
  }, [isNewWord]);

  const submit = useCallback(
    function handleSubmit(word: string) {
      if (word.toUpperCase() === wordToGuess) {
        dispatch(finish());
        updateStats({ guessed: true, numberOfGuesses: currentLine + 1 });
      } else {
        dispatch(changeLine());
        if (currentLine >= 5) {
          updateStats({ guessed: false, numberOfGuesses: 6 });
        }
      }
    },
    [dispatch, wordToGuess, currentLine]
  );

  return (
    <section className="flex flex-col items-center gap-8">
      <section className="flex flex-col items-center gap-6">
        <h2 className="text-wrap text-center">
          Guess the five letter word! <br /> Submit guesses by pressing ENTER
        </h2>
        <h2 className="text-wrap text-center">
          {finished
            ? `Correct! The word is "${wordToGuess}". You guessed in ${
                currentLine + 1
              } tries.`
            : currentLine >= 6
            ? `You didn’t manage to guess the word "${wordToGuess}". Good luck next time.`
            : `Tries left: ${6 - currentLine}`}
        </h2>
        {/* <Button
          text="Guess"
          onClick={() => submit(guess)}
          disabled={guess.length !== 5}
        /> */}
        <Board word={wordToGuess} submit={submit} currentLine={currentLine} />
      </section>
      <Button text="New Word" onClick={() => setIsNewWord(true)} />
      <section className="w-[320px] sm:w-[360px] flex justify-between">
        <span className="flex flex-col items-center">
          <p>Words guessed</p>
          <h2>{totalWords === 0 ? "-" : `${wordsGuessed}/${totalWords}`}</h2>
        </span>
        <span className="flex flex-col items-center">
          <p>Avg. guesses</p>
          <h2>{totalWords === 0 ? "-" : avgGuesses}</h2>
        </span>
      </section>
    </section>
  );
}
