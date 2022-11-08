import { useNavigate } from "react-router";
import { BASE_URL } from "../constants";

export const Home = () => {
  const navigate = useNavigate();

  const onClickStart = async () => {
    const response = await fetch(`${BASE_URL}/random-quiz`).then((response) =>
      response.json()
    );
    navigate(`/quiz/${response.id}`);
  };

  return (
    <div className="App">
      <div className="card">
        <button onClick={onClickStart}>START</button>
      </div>
    </div>
  );
};
