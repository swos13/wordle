const WORD_LIST_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export async function getWord() {
  const response = await fetch(WORD_LIST_URL, { mode: "no-cors" });
  const words = (await response.json()) as Array<string>;
  return words[Math.floor(Math.random() * words.length)];
}
