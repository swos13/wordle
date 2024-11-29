"use client";

import Line from "./Line";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/state/store";

type BoardProps = {
  word: string;
  submit: (guess: string) => void;
};

export default function Board({ word, submit }: BoardProps) {
  const currentIndex = useSelector(
    (state: RootState) => state.game.currentLine
  );

  const handleSubmit = (guess: string) => {
    submit(guess);
  };

  return (
    <div className="flex flex-col gap-1">
      <div>{word}</div>
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <Line
            index={index}
            currentIndex={currentIndex}
            handleSubmit={handleSubmit}
          />
        </div>
      ))}
    </div>
  );
}
