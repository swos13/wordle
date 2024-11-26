"use client";

import { useEffect, useRef, useState } from "react";
import LetterBox from "./LetterBox";

type LineProps = {
  length?: 5;
  index: number;
  currentIndex: number;
};

export default function Line({ index, currentIndex }: LineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [guess, setGuess] = useState("");
  const [isFocused, setIsFocused] = useState(currentIndex === index);

  const handleChange = () => {
    setGuess(inputRef.current?.value ?? "");
  };

  const handleFocus = (state: boolean) => {
    setIsFocused(state);
    if (state) inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      />
      <div
        className={`flex gap-1 ${
          isFocused ? "outline-8 outline-slate-700 outline-none" : ""
        }`}
        onClick={() => handleFocus(true)}
        onFocus={() => handleFocus(true)}
      >
        {[...Array(5)].map((_, index) => (
          <LetterBox key={index} letter={guess.charAt(index)} />
        ))}
      </div>
    </>
  );
}
