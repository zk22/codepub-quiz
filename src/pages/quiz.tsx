import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Option, Question, Result, Steps } from "../components";
import { fetch } from "../network";
import useStore from "../store";

export const Quiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { info, setInfo } = useStore();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [correctOptionId, setCorrectOptionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch("GET", `/quiz/${id}`);
      setQuestions(response.questions);
    };

    if (!info?.userId) {
      navigate(`/`);
    } else {
      getQuiz();
    }
  }, []);

  const onSelectOption = async (questionId: string, optionId: string) => {
    try {
      setError("");
      setLoading(true);
      setSelectedOptionId(optionId);

      const response = await fetch("POST", "/answer", {
        data: {
          quizId: id,
          userId: info.userId,
          questionId,
          selectedOption: optionId,
        },
      });

      setLoading(false);
      setCorrectOptionId(response.correctOption);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || err?.message);
    }
  };

  const next = () => {
    if (info.selectedQuestionIndex < questions.length - 1) {
      setInfo({
        ...info,
        selectedQuestionIndex: info.selectedQuestionIndex + 1,
      });
      setSelectedOptionId("");
      setCorrectOptionId("");
      setError("");
    }
  };

  const finish = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch("POST", "/finish", {
        data: { quizId: id, userId: info.userId },
      });

      setInfo({
        ...info,
        isFinished: true,
        correctCount: response.correctCount,
        duration: response.duration,
        totalCount: questions.length,
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || err?.message);
    }
  };

  if (info?.isFinished) {
    return (
      <Result
        correct={info?.correctCount || 0}
        total={info?.totalCount || 0}
        duration={info?.duration || 0}
        userId={info?.userId}
      />
    );
  }

  const selectedQuestion = questions[info.selectedQuestionIndex];
  if (!selectedQuestion) {
    return <></>;
  }

  return (
    <>
      <Steps current={info?.selectedQuestionIndex} total={questions.length} />
      <div className="p-4 w-full md:w-96 m-auto mt-32">
        <Question
          key={selectedQuestion.id}
          id={selectedQuestion.id}
          label={selectedQuestion.label}
          selectedOption={selectedOptionId}
          correctOption={correctOptionId}
          onSelectOption={onSelectOption}
        >
          {selectedQuestion.options.map((option) => {
            return (
              <Option key={option.id} id={option.id}>
                {option.label}
              </Option>
            );
          })}
        </Question>
        {info.selectedQuestionIndex < questions.length - 1 ? (
          <Button
            onClick={next}
            disabled={!selectedOptionId || loading}
            loading={loading}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={finish}
            disabled={!selectedOptionId || loading}
            loading={loading}
          >
            Finish
          </Button>
        )}
        {error && <div className="text-sm text-red-500 my-4">{error}</div>}
      </div>
    </>
  );
};
