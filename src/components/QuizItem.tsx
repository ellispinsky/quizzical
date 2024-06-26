interface QuizItemProps {
    question: string;
    answers: string[];
  }

function QuizItem({question , answers}) 
{
  return (
    <><h2>{question}</h2><p>{answers}</p></>

  )
}
 
export default QuizItem