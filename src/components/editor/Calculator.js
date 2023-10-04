import React, { useState } from "react";

function Calculator() {
  // this is the way to define state in react
  // explanation -> const ["statename", "setStatename _function"] = useState("defaultvalue")
  const [counter, setCounter] = useState(0);
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  return (
    <>
      {/* 
      1. add 2 states for input fields
      2. when i change the value in an input field- how is the state changed? onChange
      3. take value from 2 fields add them and update the counter
      */}
      Num1: <input value={num1} onChange={(e) => setNum1(e.target.value)} />
      <br />
      Num2: <input value={num2} onChange={(e) => setNum2(e.target.value)} />
      {/* Plus action */}
      <button className="btn btn-info" onClick={() => setCounter(parseFloat(num1) + parseFloat(num2))}>
        Press +
      </button>
      &nbsp;
      {/* minus action */}
      <button className="btn btn-info" onClick={() => setCounter(parseFloat(num1) - parseFloat(num2))}>
        Press -
      </button>
      <div>{counter}</div>
    </>
  );
}

export default Calculator;
