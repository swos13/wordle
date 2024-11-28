import Board from "./Board";

type GameProps = {
  word: string;
};

export default function Game({ word }: GameProps) {
  return (
    <section className="flex flex-col items-center gap-4">
      <button>New Word</button>
      <section className="w-full flex justify-around">
        <span className="flex flex-col items-center">
          <p>Words guessed</p>
          <h2>12/17</h2>
        </span>
        <span className="flex flex-col items-center">
          <p>Avg. guesses</p>
          <h2>4.6</h2>
        </span>
      </section>
      <section className="flex flex-col items-center gap-2">
        <button>Guess</button>
        <Board word={word} />
      </section>
    </section>
  );
}
