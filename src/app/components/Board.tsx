"use client";

import { useState } from "react";
import Line from "./Line";

export default function Board({ word }: { word: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSubmit = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>{word}</div>
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <Line index={index} currentIndex={currentIndex} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ))}
    </div>
  );
}
