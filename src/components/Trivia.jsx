import { useEffect, useState } from "react";

export default function Trivia({
  data,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
  setMoney,
  selectedAnswer,
  setSelectedAnswer
}) {
  const [question, setQuestion] = useState(null);
  const [className, setClassName] = useState("answer");
  

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (ans) => {
    setSelectedAnswer(ans);
    setClassName("answer active");
    
    delay(3000, () => {
      setClassName(ans.correct ? "answer correct" : "answer wrong"); 
    });
    
    delay(5000, () => {
      if (ans.correct) {
        delay(1000, () => {
          setMoney((prev) => prev + 1) 
          if (questionNumber < data.length) {
            setQuestionNumber((prev) => prev + 1)
          } else {
            setTimeOut(true);
          }
          setSelectedAnswer(null);
        });
      } else {
        delay(1000, () => {
          setSelectedAnswer(null)
          setTimeOut(true);
        });
      }
   })
  };
  
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((ans,index) => (
          <div
            key={index} className={selectedAnswer === ans ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(ans)}
          >
            {ans.text}
          </div>
        ))}
      </div>
    </div>
  );
}
