import QuizItem from "./QuizItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

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
    function formatQuestions(data: Question[]): Question[] {
    return data.map((item: Question) => {
      const allAnswers = [item.correct_answer, ...item.incorrect_answers];
      return {
        ...item,
        allAnswers: allAnswers,
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
  
        <QuizItem key={index} question={question.question} answers={question.allAnswers} correctAnswer={question.correct_answer}/>
      
      ))
    ) : (
      <p>Loading quiz data...</p>  // Display a loading message or spinner
    )}
    </>
  );
}
export default QuizComponent;
