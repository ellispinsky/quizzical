
interface QuizItemProps {
  question: string;
  answers: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
  isSubmitted: boolean;
  onAnswerSelect: (question: string, answer: string) => void;
}

function QuizItem({ question, answers, correctAnswer, selectedAnswer, isSubmitted, onAnswerSelect }: QuizItemProps) {
  function handleClick(answer: string) {
    if (!isSubmitted) {
      onAnswerSelect(question, answer);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold m-1 text-gray-700">{question}</h2>
      <ul className="list-item pl-5 space-y-2">
        {answers.map((answer, index) => {
          let answerClass = 'border-gray-200';
          if (isSubmitted && selectedAnswer === answer) {
            answerClass = answer === correctAnswer ? 'bg-green-200 border-green-200' : 'bg-red-200 border-red-200';
          } else if (selectedAnswer === answer) {
            answerClass = 'bg-blue-200 border-blue-200';
          }

          return (
            <li
              key={index}
              className={`inline-block m-1 text-gray-600 px-4 py-1 border-2 rounded-xl cursor-pointer ${answerClass}`}
              onClick={() => handleClick(answer)}
            >
              {answer}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default QuizItem;