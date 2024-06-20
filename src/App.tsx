import { useState } from "react";

import "./App.css";
import QuizComponent from "./components/QuizComponent";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };
  return (
    <>
      {quizStarted ? (
        <QuizComponent/>
      ): (
        <div>
          <h1>Welcome to Quizzical</h1>
          <button onClick={startQuiz}>Start Quiz</button> 
        </div>
      )}
    </>
  );
}

export default App;
