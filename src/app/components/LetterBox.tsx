type LetterBoxProps = {
  letter: string;
};

export default function LetterBox({ letter }: LetterBoxProps) {
  return (
    <div className="border-2 gap-1 border-solid rounded-md bg-letter-box border-border-color w-16 h-16 text-center">
      {letter.toUpperCase()}
    </div>
  );
}
