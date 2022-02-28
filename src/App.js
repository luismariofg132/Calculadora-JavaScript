import { useState } from "react";

function App() {

  const [calculo, setcalculo] = useState("")

  const operadores = [
    { id: "add", val: "+" },
    { id: "subtract", val: "-" },
    { id: "multiply", val: "*" },
    { id: "divide", val: "/" }
  ]
  const numeros = [
    { id: "one", val: 1 },
    { id: "two", val: 2 },
    { id: "three", val: 3 },
    { id: "four", val: 4 },
    { id: "five", val: 5 },
    { id: "six", val: 6 },
    { id: "seven", val: 7 },
    { id: "eight", val: 8 },
    { id: "nine", val: 9 },
    { id: "zero", val: 0 },
    { id: "decimal", val: "." }
  ]

  const actualizarCalculo = value => {
    const operatorPattern = /[+\-*/]/;
    if (calculo === "" && value === "0") {
      return;
    }
    if (value === ".") {
      const parts = calculo.split(operatorPattern);
      if (parts[parts.length - 1].includes(".")) {
        return;
      }
    }
    if (value !== "-" && operatorPattern.test(value)) {
      const lastChar = calculo[calculo.length - 1] || "";
      const secondLastChar = calculo[calculo.length - 2] || "";
      if (operatorPattern.test(lastChar)) {
        if (lastChar === "-" && operatorPattern.test(secondLastChar)) {
          setcalculo(calculo.slice(0, -2) + value);
          return;
        }
        setcalculo(calculo.slice(0, -1) + value);
        return;
      }
    }

    setcalculo(calculo + value);
  };

  const reset = () => {
    setcalculo("")
  }

  const eliminar = () => {
    if (calculo === "") {
      return;
    }

    const value = calculo.slice(0, -1);
    setcalculo(value);
  };


  const calcular = () => {
    // eslint-disable-next-line
    const calcular = eval(calculo).toString()
    setcalculo(calcular);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display" id="display">
          {calculo || 0}
        </div>
        <div className="operators">
          {
            operadores.map((ope, index) => (
              <button key={index} id={ope.id} onClick={() => actualizarCalculo(`${ope.val}`)}>{ope.val}</button>
            ))
          }
          <button id="del" onClick={() => eliminar()}>DEL</button>
          <button id="clear" onClick={reset}>AC</button>
        </div>
        <div className="digits">
          {
            numeros.map((num, index) => (
              <button key={index} id={num.id} onClick={() => actualizarCalculo(`${num.val}`)}>{num.val}</button>
            ))
          }
          <button id="equals" onClick={() => calcular()}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
