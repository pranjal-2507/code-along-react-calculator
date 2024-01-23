/* eslint-disable no-unused-vars */
import { useReducer } from "react";
import React from "react";
import "./Calculator.css";

const initState = {
  input: "",
  res: "",
};
let operators = ["+", "-", "/", "*"];
function reducer(state = initState, { type, payload }) {
  switch (type) {
    case "ADDINP": {
      let addOps = true;
      if (
        operators.includes(payload) &&
        operators.includes(
          state.input.slice(state.input.length - 1, state.input.length)
        )
      ) {
        addOps = false;
      } else {
        addOps = true;
      }

      if (addOps) {
        console.log({ ...state, input: state.input + payload });
        return { ...state, input: state.input + payload };
      }
      return { ...state };
    }
    case "CLEAR": {
      return { ...state, input: "", res: "" };
    }
    case "CALCULATE": {
      const inplen = state.input.length;
      if (!operators.includes(state.input.slice(inplen - 1, inplen))) {
        try {
          const result = eval(state.input);
          if (!Number.isFinite(result)) {
            throw new error("cannot divide by zero");
          }
          const newInp = {
            ...state,
            res: "",
            input: result.toString(),
          };
          return newInp;
        } catch (error) {
          console.log(error);
        }
      } else {
        return {
          ...state,
          input: eval(state.input.slice(0, inplen - 1)).toString(),
          res: "",
        };
      }
    }
    case "DELETE": {
      return {
        ...state,
        input: state.input.slice(0, state.input.length - 1),
      };
    }
    default: {
      return state;
    }
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  let handleClick = (val) => {
    dispatch({ type: "ADDINP", payload: val });
  };
  let handleClear = () => {
    dispatch({ type: "CLEAR" });
  };
  let handleCal = () => {
    dispatch({ type: "CALCULATE" });
  };
  let handleDel = () => {
    dispatch({ type: "DELETE" });
  };

  return (
    <>
      <div id="calculator">
        <div className="dis">
          <p className="input"></p>
          <p className="result">{state.input}</p>
        </div>
        <div id="display">
          <div id="keys">
            <button className="operator" onClick={() => handleClick("+")}>
              +
            </button>
            <button onClick={() => handleClick("7")}>7</button>
            <button onClick={() => handleClick("8")}>8</button>
            <button onClick={() => handleClick("9")}>9</button>
            <button onClick={() => handleClick("-")} className="operator">
              -
            </button>
            <button onClick={() => handleClick("4")}>4</button>
            <button onClick={() => handleClick("5")}>5</button>
            <button onClick={() => handleClick("6")}>6</button>
            <button onClick={() => handleClick("x")} className="operator">
              x
            </button>
            <button onClick={() => handleClick("1")}>1</button>
            <button onClick={() => handleClick("2")}>2</button>
            <button onClick={() => handleClick("3")}>3</button>
            <button onClick={() => handleClick("/")} className="operator">
              /
            </button>
            <button onClick={() => handleClick("0")}>0</button>
            <button>.</button>
            <button onClick={handleCal}>=</button>
          </div>
          <button onClick={handleDel} id="clear">
            C
          </button>
          <button onClick={handleClear} id="allClear">
            AC
          </button>
        </div>
      </div>
    </>
  );
};

export default Calculator;
