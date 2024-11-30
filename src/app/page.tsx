import { getWord } from "@/api/word";
import Game from "./components/Game";
import localFont from "next/font/local";

const JockeyOne = localFont({
  src: "./fonts/JockeyOne-Regular.ttf",
  display: "swap",
});

export default async function Home() {
  const word = await getWord();
  return (
    <main>
      <h1
        className={`text-center ${JockeyOne.className} text-6xl mb-12 md:mb-16 `}
      >
        Wordie
      </h1>
      <Game word={word} />
    </main>
  );
}
