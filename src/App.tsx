import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Quiz } from "./pages/quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
