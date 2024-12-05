import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/state/store";
import { useCallback, useEffect } from "react";
import { loadStats, saveStats } from "../lib/storage/localStorage";
import { setStats, updateStats } from "../lib/state/stats/statsSlice";
import { Result } from "../lib/types";

export default function useStats() {
  const { wordsGuessed, totalWords, avgGuesses } = useSelector(
    (state: RootState) => state.stats
  );
  const dispatch = useDispatch();

  const update = useCallback(
    (result: Result) => {
      dispatch(updateStats(result));
    },
    [dispatch]
  );

  useEffect(() => {
    const stats = loadStats();
    if (stats) dispatch(setStats({ ...stats }));
  }, []);

  useEffect(() => {
    saveStats({ wordsGuessed, totalWords, avgGuesses });
  }, [wordsGuessed, totalWords, avgGuesses]);

  return { wordsGuessed, totalWords, avgGuesses, update };
}
