"use client";

import React from "react";
import Line from "./Line";

type BoardProps = {
  word: string;
  submit: (guess: string) => void;
  currentLine: number;
};

export default React.memo(function Board({
  word,
  submit,
  currentLine,
}: BoardProps) {
  return (
    <div className="flex flex-col gap-1">
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <Line
            index={index}
            submit={submit}
            currentLine={currentLine}
            word={word}
          />
        </div>
      ))}
    </div>
  );
});
