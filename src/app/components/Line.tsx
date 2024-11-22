import LetterBox from "./LetterBox";

type LineProps = {
  length?: 5;
};

export default function Line({}: LineProps) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <LetterBox key={index} />
      ))}
    </div>
  );
}
