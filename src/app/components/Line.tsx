"use client";

import { useCallback, useEffect, useRef, useState, memo } from "react";
import LetterBox from "./LetterBox";
import { LetterBoxColor } from "./LetterBox";
import { useDispatch } from "react-redux";
import { setGuess } from "@/app/lib/state/game/gameSlice";

type LineProps = {
  length?: 5;
  index: number;
  submit: (guess: string) => void;
  currentLine: number;
  word: string;
};

function Line({ index, submit, currentLine, word }: LineProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(currentLine === index);
  const [submitted, setSubmitted] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const [boxColorNames, setBoxColorNames] = useState<LetterBoxColor[]>(
    Array(5).fill("bg-default-box")
  );
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    function (e: Event) {
      if (
        submit &&
        e instanceof KeyboardEvent &&
        e.key === "Enter" &&
        inputRef.current
      ) {
        const wordToSubmit = inputWord.toUpperCase();

        submit(wordToSubmit);
        const newBoxColorNames = Array(5).fill("bg-default-box");

        wordToSubmit.split("").forEach((letter, id) => {
          const occurenceReducer = (
            indices: Array<number>,
            char: string,
            id: number
          ) => {
            if (letter === char) indices.push(id);
            return indices;
          };

          const occurencesInWord = word
            .split("")
            .reduce(occurenceReducer, new Array<number>());

          const occurencesInSubmit = wordToSubmit
            .split("")
            .reduce(occurenceReducer, new Array<number>());

          if (word.charAt(id) === letter)
            newBoxColorNames[id] = "bg-correct-box";
          else if (
            word.includes(letter) &&
            occurencesInSubmit.indexOf(id) < occurencesInWord.length
          ) {
            let areInPlace = true;
            occurencesInWord.forEach((occurence) => {
              if (!occurencesInSubmit.includes(occurence)) areInPlace = false;
            });

            if (!areInPlace) newBoxColorNames[id] = "bg-wrong-place-box";
          }
        });

        setBoxColorNames(newBoxColorNames);
        setSubmitted(true);
        inputRef.current?.blur();
      }
    },
    [submit, inputWord, setBoxColorNames, word]
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
    if (index + 1 === currentLine || (index === 5 && currentLine === -1))
      setSubmitted(true);
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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setBoxColorNames(Array(5).fill("bg-default-box"));
      setInputWord("");
      setSubmitted(false);
    }
  }, [inputRef.current, word]);

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
            colorName={boxColorNames[letterIndex]}
            submitted={submitted}
            index={letterIndex}
          />
        ))}
      </div>
    </>
  );
}

export default memo(Line);
