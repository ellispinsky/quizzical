import { useState } from "react";

interface QuizItemProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  onAnswerSelect: (question: string, answer: string) => void;
}

function QuizItem({
  question,
  answers,
  correctAnswer,
  onAnswerSelect,
}: QuizItemProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function handleClick(answer: string) {
    setSelectedAnswer(answer);
    onAnswerSelect(question, answer);
    // setIsCorrect(answer === correctAnswer)
    // console.log("the answer:"  ,answer ,"the correct answer:", correctAnswer)
  }
  // function handleSubmit()
  // {
  //   if(selectedAnswer !== null) {
  //     setIsCorrect(selectedAnswer === correctAnswer)
  // }

  // styling for onClick of answer
  //${selectedAnswer === answer ? (isCorrect ? 'bg-green-200 border-green-200' : 'bg-red-200 border-red-200') : 'border-gray-200'}
  return (
    <>
      <h2 className="text-2xl font-bold m-1 text-gray-700">{question}</h2>
      <ul className="list-item pl-5 space-y-2">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`inline-block m-1 text-gray-600 px-4 py-1 border-2 rounded-xl cursor-pointer border-gray-200 ${
              selectedAnswer === answer
                ? "bg-blue-200 border-blue-200"
                : "border-gray-200"
            }`}
            onClick={() => handleClick(answer)}
          >
            {answer}
          </li>
        ))}
      </ul>
    </>
  );
}
export default QuizItem;
