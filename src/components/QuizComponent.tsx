import QuizItem from "./QuizItem";
import { useEffect, useState } from "react";
import axios from "axios";

import he from 'he'

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
    // helper function
    function formatQuestions(data: Question[]): Question[] 
    {
    return data.map((item: Question) => {
      const allAnswers = [...item.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
      allAnswers.splice(randomIndex, 0 , item.correct_answer)
      return {
        ...item,
        question: he.decode(item.question) , //decode question title
        allAnswers: allAnswers.map(answer => he.decode(answer))
      };
    });
  }
  useEffect(() => 
    {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const response = await axios.get("https://opentdb.com/api.php?amount=10");
        const results: Question[] = response.data.results
        const formattedQuestions = formatQuestions(results);
        setQuizData(formattedQuestions);
        console.log("Data fetched and formatted:", formattedQuestions);
      } catch(error) 
      {
        console.error("Error fetching data:", error)
      } 
}
    fetchData();
  }, []);
  

  return (
    <>
    {quizData.length > 0 ? (
    
      quizData.map((question, index) => (
  
        <QuizItem key={index} question={question.question} answers={question.allAnswers ?? []} correctAnswer={question.correct_answer}/>
      
      ))
    ) : (
      <p>Loading quiz data...</p>  // Display a loading message or spinner
    )}
    </>
  );
}
export default QuizComponent;
