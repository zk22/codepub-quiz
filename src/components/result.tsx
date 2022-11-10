import { useMemo } from "react";

interface ResultProps {
  correct: number;
  total: number;
}

export const Result = ({ correct, total }: ResultProps) => {
  const emoji = useMemo(() => {
    const percentage = (100 * correct) / total;

    if (percentage < 50) {
      return "💩";
    } else if (percentage < 75) {
      return "😐";
    } else if (percentage <= 100) {
      return "🎉";
    }
  }, [correct, total]);

  return (
    <div className="w-screen h-screen bg-purple-100 flex flex-col items-center justify-center gap-4 p-4">
      <div className="text-6xl">{emoji}</div>
      <div className="p-4 text-2xl bg-white rounded shadow-md w-full md:w-96">
        <div>Your final score is</div>
        <div className="font-bold text-violet-500 m-2">{`${correct} / ${total}`}</div>
      </div>
    </div>
  );
};
