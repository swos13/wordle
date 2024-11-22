import { getWord } from "@/api/word";

export default async function Board() {
  const word = await getWord();

  return (
    <>
      <div>{word}</div>
    </>
  );
}
