"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import LetterBox from "./LetterBox";

type LineProps = {
  length?: 5;
  index: number;
  currentIndex: number;
  handleSubmit: (guess: string) => void;
};

export default function Line({ index, currentIndex, handleSubmit }: LineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [guess, setGuess] = useState("");
  const [isFocused, setIsFocused] = useState(currentIndex === index);

  const submit = useCallback(
    function (e: Event) {
      if (e instanceof KeyboardEvent && e.key === "Enter") {
        handleSubmit(guess);
      }
    },
    [handleSubmit, guess]
  );

  const handleChange = () => {
    setGuess(inputRef.current?.value ?? "");
  };

  const handleFocus = (state: boolean) => {
    setIsFocused(state);
    if (state) inputRef.current?.focus();
  };

  useEffect(() => {
    if (currentIndex === index) inputRef.current?.focus();
  }, [currentIndex, index]);

  useEffect(() => {
    if (inputRef.current) {
      const input = inputRef.current;
      if (currentIndex === index && guess.length === 5) {
        input.addEventListener("keypress", submit);
      }
      return () => {
        input.removeEventListener("keypress", submit);
        console.log(input?.getAttribute("listener"));
      };
    }
  }, [currentIndex, inputRef.current, submit]);

  return (
    <>
      <input
        type="text"
        className="opacity-0 pointer-events-none absolute"
        maxLength={5}
        ref={inputRef}
        value={guess}
        onChange={handleChange}
        onBlur={() => handleFocus(false)}
        onFocus={() => handleFocus(true)}
        tabIndex={-1}
      />
      <div
        className={`flex gap-1 ${
          isFocused && currentIndex === index
            ? "outline-8 outline-slate-700 outline-none"
            : ""
        }`}
        onClick={() => handleFocus(true)}
        onFocus={() => handleFocus(true)}
        tabIndex={currentIndex === index ? 1 : -1}
      >
        {[...Array(5)].map((_, index) => (
          <LetterBox key={index} letter={guess.charAt(index)} />
        ))}
      </div>
      <button
        onClick={() => handleSubmit(guess)}
        disabled={
          inputRef.current?.value.length !== 5 || currentIndex !== index
        }
      >
        Submit
      </button>
    </>
  );
}
