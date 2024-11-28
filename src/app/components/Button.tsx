"use client";

type ButtonProps = {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  handleClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className="border-solid border-2 border-letter-box"
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
