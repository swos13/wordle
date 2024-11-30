"use client";

import { Inter } from "next/font/google";

const inter = Inter({ weight: "900", subsets: ["latin"] });

type LetterBoxProps = {
  letter: string;
  isFocused: boolean;
};

export default function LetterBox({ letter, isFocused }: LetterBoxProps) {
  return (
    <div
      className={`flex justify-center text-4xl  items-center border-2 gap-1 border-solid rounded-md bg-letter-box border-border-color w-16 h-16 text-center ${
        inter.className
      } ${isFocused ? "bg-letter-focused border-border-focused" : ""}`}
    >
      {letter.toUpperCase()}
    </div>
  );
}
