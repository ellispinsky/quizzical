
import styles from './QuizItem.module.css';
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
  const questionStyle = {
    color: '#293264',
    fontFamily: 'Karla, sans-serif',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    
  };
  

  return (
    <>
      <h2 style={questionStyle} className="m-2">{question}</h2>
      <ul className="list-item pl-5 space-y-2">
        {answers.map((answer, index) => {
          let answerClass = 'border-gray-200';
          if (isSubmitted && selectedAnswer === answer) {
            answerClass = answer === correctAnswer ? 'bg-green-200 border-green-200' : 'bg-red-200 border-red-200';
          } else if (selectedAnswer === answer) {
            answerClass = `${styles.customColor} border-${styles.customColor}-200`;
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