"use client";

import { Inter } from "next/font/google";

const inter = Inter({ weight: "900", subsets: ["latin"] });

export type LetterBoxColor =
  | "bg-default-box"
  | "bg-correct-box"
  | "bg-wrong-place-box";

type LetterBoxProps = {
  letter: string;
  isFocused: boolean;
  colorName: LetterBoxColor;
};

export default function LetterBox({
  letter,
  isFocused,
  colorName = "bg-default-box",
}: LetterBoxProps) {
  return (
    <div
      className={`flex justify-center text-4xl  items-center border-2 gap-1 border-solid rounded-md border-border-color w-16 h-16 text-center ${
        inter.className
      } ${isFocused ? "bg-letter-focused border-border-focused" : colorName}`}
    >
      {letter.toUpperCase()}
    </div>
  );
}
