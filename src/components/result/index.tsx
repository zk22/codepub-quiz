import { useMemo } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

interface ResultProps {
  correct: number;
  total: number;
  duration: number;
  userId: string;
}

const formattedTime = (milliseconds: number) => {
  return formatDuration(intervalToDuration({ start: 0, end: milliseconds }));
};

export const Result = ({ correct, total, duration, userId }: ResultProps) => {
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
        <div className="m-2 font-bold text-violet-500">{`${correct} / ${total}`}</div>
      </div>
      <div className="text-violet-500">
        <div>
          <span className="font-bold">Username: </span> {userId}
        </div>
        <div>
          <span className="font-bold">Duration: </span>
          {formattedTime(duration)}
        </div>
      </div>
    </div>
  );
};
