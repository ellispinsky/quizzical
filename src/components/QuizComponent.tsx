import QuizItem from "./QuizItem";
import { useEffect, useState } from "react";
import axios from "axios";

import he from "he";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers?: string[];
}

function QuizComponent() {
  const [quizData, setQuizData] = useState<Question[]>([]); // Define the state with a specific type
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [result, setResult] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // helper function
  function formatQuestions(data: Question[]): Question[] {
    return data.map((item: Question) => {
      const allAnswers = [...item.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
      allAnswers.splice(randomIndex, 0, item.correct_answer);
      return {
        ...item,
        question: he.decode(item.question), //decode question title
        allAnswers: allAnswers.map((answer) => he.decode(answer)),
      };
    });
  }
  function handleAnswerSelect(question: string, answer: string) {
    setSelectedAnswers((prev) => ({ ...prev, [question]: answer }));
    // console.log("the question:", question, "the answer:", answer)
    console.log(selectedAnswers);
  }
  function handleSubmit() {
    const correctAnswers = quizData.filter(
      (q) => selectedAnswers[q.question] === q.correct_answer
    ).length;
    
    setResult(`You got ${correctAnswers} out of ${quizData.length} correct!`);
    setIsSubmitted(true)
  }
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5"
        );
        const results: Question[] = response.data.results;
        const formattedQuestions = formatQuestions(results);
        setQuizData(formattedQuestions);
        console.log("Data fetched and formatted:", formattedQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {quizData.length > 0 ? (
        <div>
          {quizData.map((question, index) => (
            <QuizItem
              key={index}
              question={question.question}
              answers={question.allAnswers ?? []}
              correctAnswer={question.correct_answer}
              onAnswerSelect={handleAnswerSelect}
              isSubmitted={isSubmitted}
              selectedAnswer={selectedAnswers[question.question] || null}
            />
          ))}
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
            Submit
          </button>
          {result && <p className="mt-4 text-xl">{result}</p>}
        </div>
      ) : (
        <p>Loading quiz data...</p> // Display a loading message or spinner
      )}
    </div>
  );
}
export default QuizComponent;
