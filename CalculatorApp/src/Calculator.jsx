import { useState, useEffect } from "react";
import Display from './Display';
import "./Calculator.css"

let Keys = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;

      if ((key >= '0' && key <= '9') || 
      key === '+' || key === '-' || 
      key === '*' || key === '/' || 
      key === '.') {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        handleEvaluate();
      } else if (key === 'Backspace') {
        handleDelete();
      } else if (key.toLowerCase() === 'c') {
        handleAllclear();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleButtonClick = (value) => {
    setName((prevName) => prevName + value);
  };

  const handleAllclear = () => {
    setName("");
  };

  const handleDelete = () => {
    setName((prevName) => prevName.slice(0, -1));
  };

  const handleEvaluate = () => {
    setName(eval(name).toString());
  };

  const handleClick = (e) => {
    handleButtonClick(e.target.value);
  };

  return (
    <>
    <div className="main">
      <div className="output"><Display name={name} /></div>
      <div className="keypad">
        <div className="three-buttons">
        <div className="a">
          <button className="ac" onClick={handleAllclear}>AC</button>
          <button className="del" onClick={handleDelete}>DEL</button>
          <button className="equal" onClick={handleEvaluate}>=</button>
        </div>
        </div>

        <div className="four-buttons">
        <div className="b">
          <button className="buttons" onClick={handleClick} value="7">7</button>
          <button className="buttons" onClick={handleClick} value="8">8</button>
          <button className="buttons" onClick={handleClick} value="9">9</button>
          <button className="buttons" onClick={handleClick} value="/">/</button>
        </div>

        <div className="c">
          <button className="buttons" onClick={handleClick} value="4">4</button>
          <button className="buttons" onClick={handleClick} value="5">5</button>
          <button className="buttons" onClick={handleClick} value="6">6</button>
          <button className="buttons" onClick={handleClick} value="*">*</button>
        </div>

        <div className="d">
          <button className="buttons" onClick={handleClick} value="1">1</button>
          <button className="buttons" onClick={handleClick} value="2">2</button>
          <button className="buttons" onClick={handleClick} value="3">3</button>
          <button className="buttons" onClick={handleClick} value="-">-</button>
        </div>

        <div className="e">
          <button className="buttons" onClick={handleClick} value="0">0</button>
          <button className="buttons" onClick={handleClick} value=".">.</button>
          <button className="buttons" onClick={handleClick} value="+">+</button>
          <button className="buttons" onClick={handleClick} value="%">%</button>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Keys;