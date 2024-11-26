type LetterBoxProps = {
  letter: string;
};

export default function LetterBox({ letter }: LetterBoxProps) {
  return (
    <div className="border-2 border-solid border-slate-700 w-24 h-24 text-center">
      {letter.toUpperCase()}
    </div>
  );
}
