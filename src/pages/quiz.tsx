import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../constants";

export const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(`${BASE_URL}/quiz/${id}`).then((response) =>
        response.json()
      );

      setQuestions(response.questions);

      console.log(response.questions);
    };

    getQuiz();
  }, []);

  return <div>QUIZ</div>;
};
