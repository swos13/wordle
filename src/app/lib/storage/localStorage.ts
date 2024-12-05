"use client";

import { Stats } from "../types";

let localStorage: Storage;

if (typeof window !== "undefined") {
  localStorage = window.localStorage;
}

export function getItem(key: string) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  return JSON.parse(item);
}

export function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  return true;
}

export function saveStats({ avgGuesses, wordsGuessed, totalWords }: Stats) {
  return setItem<Stats>("stats", { avgGuesses, wordsGuessed, totalWords });
}

export function loadStats() {
  return getItem("stats") as Stats;
}
