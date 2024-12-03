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
  submitted: boolean;
  index: number;
};

export default function LetterBox({
  letter,
  isFocused,
  colorName = "bg-default-box",
  submitted,
}: LetterBoxProps) {
  return (
    <div
      className={`flex justify-center text-4xl  items-center border-2 gap-1 border-solid rounded-md border-border-color w-16 h-16 text-center ${
        inter.className
      } ${isFocused ? "bg-letter-focused border-border-focused" : colorName} ${
        submitted ? "animate-spin-horizontally delay-1000" : ""
      }`}
      style={{
        transition: "background-color 0s 600ms",
        animationFillMode: "forward",
      }}
    >
      <span
        className={`${submitted ? "animate-spin-horizontally" : ""}`}
        style={{
          animationFillMode: "forward",
        }}
      >
        {letter.toUpperCase()}
      </span>
    </div>
  );
}
