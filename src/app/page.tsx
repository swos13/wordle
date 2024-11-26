import { getWord } from "@/api/word";
import Board from "./components/Board";

export default async function Home() {
  const word = await getWord();
  return (
    <main>
      <h1 className="text-center">Wordle</h1>
      <Board word={word} />
    </main>
  );
}
