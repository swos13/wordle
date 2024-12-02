"use client";

import { Inter } from "next/font/google";

const inter = Inter({ weight: "900", subsets: ["latin"] });

export type LetterBoxColor = "default-box" | "correct-box" | "wrong-place-box";

type LetterBoxProps = {
  letter: string;
  isFocused: boolean;
  colorName: LetterBoxColor;
};

export default function LetterBox({
  letter,
  isFocused,
  colorName = "default-box",
}: LetterBoxProps) {
  return (
    <div
      className={`flex justify-center text-4xl  items-center border-2 gap-1 border-solid rounded-md bg-${colorName} border-border-color w-16 h-16 text-center ${
        inter.className
      } ${isFocused ? "bg-letter-focused border-border-focused" : ""}`}
    >
      {letter.toUpperCase()}
    </div>
  );
}
