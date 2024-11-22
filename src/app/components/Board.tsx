import { getWord } from "@/api/word";
import Line from "./Line";

export default async function Board() {
  const word = await getWord();

  return (
    <div className="flex flex-col gap-4">
      <div>{word}</div>
      {[...Array(6)].map((_, index) => (
        <Line key={index} />
      ))}
    </div>
  );
}
