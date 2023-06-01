import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber,selectedAnswer,
   }) {
  const [timer, setTimer] = useState();
 
  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (selectedAnswer) {                   
     return clearInterval(interval);
    }
    return () => clearInterval(interval);   
  }, [timer, setTimeOut]);      
  
  useEffect(() => {
    setTimer(15);
  }, [questionNumber]);   
  return timer;         
}
