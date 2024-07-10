import { useState } from "react";

interface QuizItemProps {
  question: string;
  answers: string[];
  correctAnswer: string;
}

function QuizItem({ question, answers , correctAnswer } : QuizItemProps) {
  const [selectedAnswer , setSelectedAnswer]  = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  
  function handleClick(answer:string) {
    setSelectedAnswer(answer)
    setIsCorrect(answer === correctAnswer)
    console.log("the answer:"  ,answer ,"the correct answer:", correctAnswer)
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">{question}</h2>
      <ul className="list-item pl-5 space-y-2">
        {answers.map((answer, index) => (
          
          <li 
          key={index} 
          className={`text-gray-600 border-2 cursor-pointer ${selectedAnswer === answer ? (isCorrect ? 'bg-green-200 border-green-200' : 'bg-red-200 border-red-200') : 'border-red-200'}`}
          onClick={() => handleClick(answer)}>{answer}
          </li>
        ))}
      </ul>
      
    </>
  );
}

export default QuizItem;
