"use client";

import { useCallback, useEffect, useRef, useState, memo } from "react";
import LetterBox from "./LetterBox";
import { useDispatch } from "react-redux";
import { setGuess } from "@/lib/state/game/gameSlice";

type LineProps = {
  length?: 5;
  index: number;
  submit: (guess: string) => void;
  currentLine: number;
};

function Line({ index, submit, currentLine }: LineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(currentLine === index);
  const [inputWord, setInputWord] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    function (e: Event) {
      if (submit && e instanceof KeyboardEvent && e.key === "Enter") {
        submit(inputWord);
      }
    },
    [submit, inputWord]
  );

  const handleChange = () => {
    setInputWord(inputRef.current?.value ?? "");
    dispatch(setGuess(inputRef.current?.value ?? ""));
  };

  const handleFocus = useCallback(
    (state: boolean) => {
      if (currentLine === index) {
        setIsFocused(state);
        if (state) inputRef.current?.focus();
      }
    },
    [currentLine, index]
  );

  const handleKeypressFocus = useCallback(
    (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Enter") {
        inputRef.current?.focus();
      }
    },
    [inputRef.current]
  );

  useEffect(() => {
    if (currentLine === index) inputRef.current?.focus();
  }, [currentLine, index]);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      if (currentLine === index && inputWord.length === 5) {
        input.addEventListener("keypress", handleSubmit);
      }
      return () => {
        input.removeEventListener("keypress", handleSubmit);
      };
    }
  }, [currentLine, inputRef.current, handleSubmit]);

  useEffect(() => {
    if (currentLine === index) {
      document.addEventListener("keypress", handleKeypressFocus);
    }
    return () => {
      document.removeEventListener("keypress", handleKeypressFocus);
    };
  }, [currentLine, index, handleKeypressFocus]);

  return (
    <>
      <input
        type="text"
        className="opacity-0 pointer-events-none absolute"
        maxLength={5}
        ref={inputRef}
        value={inputWord}
        onChange={handleChange}
        onBlur={() => handleFocus(false)}
        onFocus={() => handleFocus(true)}
        tabIndex={-1}
      />
      <div
        className={`relative flex gap-1 ${
          isFocused && currentLine === index
            ? "outline-8 outline-slate-700 outline-none"
            : ""
        }`}
        onClick={() => handleFocus(true)}
        onFocus={() => handleFocus(true)}
        tabIndex={currentLine === index ? 1 : -1}
      >
        {[...Array(5)].map((_, letterIndex) => (
          <LetterBox
            key={letterIndex}
            letter={inputWord.charAt(letterIndex)}
            isFocused={isFocused && currentLine === index}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Line);
