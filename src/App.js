import { useState } from "react";
import "./app.css"
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import {data} from "./components/data"
import {moneyPyramid} from "./components/data"

function App() {

  const [questionNumber, setQuestionNumber] = useState(1)
  const [timeOut, setTimeOut] = useState(false) 
  const [money, setMoney] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const restart = () => {
    setTimeOut(false)
    setMoney(0)
    setQuestionNumber(1)
  }

  return (
    <div className="app">
      <div className="main">
        {/* TIMEOUT HANDLING  */}
        {timeOut ? 
        money > 0 ?
          <div className="endGame"><h1 className="endText">You earned: {moneyPyramid.find(m=> m.id === money).amount}</h1><button className="endGameBtn" onClick={()=> restart()}>Restart</button></div> :
         <div className="endGame"><h1 className="endText">You earned: 0 Ft </h1><button className="endGameBtn" onClick={()=> restart()}>Restart</button></div> : (   
          <>
           <div className="top">
            <div className="timer"><Timer setTimeOut={setTimeOut} questionNumber={questionNumber} selectedAnswer={selectedAnswer}/> </div>
           </div>
           <div className="bottom"><Trivia selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} data={data} setTimeOut={setTimeOut} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} setMoney={setMoney}/></div>
          </>
        )}
      </div>

      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map(m => (
            <li key={m.id} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
   
    </div>
  );
}

export default App;
