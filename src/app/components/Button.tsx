"use client";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className="border-solid border-2 border-border-color disabled:border-border-disabled disabled:bg-button-disabled active:bg-border-disabled disabled:text-text-disabled bg-letter-box rounded-lg w-[120px] h-[32px] text-center flex justify-center items-center"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
