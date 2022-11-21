import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input } from "../components";
import { fetch } from "../network";
import useStore from "../store";

export const Home = () => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { info, setInfo } = useStore();

  useEffect(() => {
    if (info?.isStarted) {
      navigate(`quiz/${info.quizId}`);
    }
  }, []);

  const onClickStart = async () => {
    try {
      setLoading(true);
      setError("");

      await fetch("POST", "/start", {
        data: { quizId, userId },
      });

      setInfo({ quizId, userId, isStarted: true, selectedQuestionIndex: 0 });
      navigate(`quiz/${quizId}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-40 mx-auto flex flex-col gap-4 items-center w-full md:w-96">
      <Input
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        placeholder="Code"
      />
      <Input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Username"
      />
      <Button
        loading={loading}
        disabled={!(quizId && userId) || loading}
        onClick={onClickStart}
      >
        START
      </Button>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
};
