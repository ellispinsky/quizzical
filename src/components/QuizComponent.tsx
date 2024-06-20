import QuizItem from "./QuizItem";
import React, { useEffect, useState } from "react";
import axios from "axios";

function QuizComponent() {
  const [quizData, setQuizData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        console.log("Fetching data...");

      try {
        axios.get("https://opentdb.com/api.php?amount=10").then((response) => {
          console.log(response.data.results);
        });
      } catch(error) {
        console.log(error)

      }
    };
    fetchData()
  }, []);
  return (
    <>
      <QuizItem />
      <QuizItem />
      <QuizItem />
    </>
  );
}
export default QuizComponent;
