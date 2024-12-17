import { Button } from "./Button";
import { controlValues, calc } from "../utils.js";
import { useEffect, useState } from "react";

export const Calculator = () => {
  const [exp, setExp] = useState("");

  const values = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "0", value: "0" },
    { label: ".", value: "." }
  ];

  const execResult = () => {
    if (!exp) return;
    try {
      const tokens = exp.split(/([+\-*/()])/).filter((s) => s);
      const numbers = [];
      const ops = [];
      let i = 0;
      const order = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
      };
      while (i < tokens.length) {
        const token = tokens[i];
        if (!isNaN(Number(token))) {
          numbers.push(parseFloat(token)); // Используем parseFloat для правильной обработки десятичных чисел
          i++;
        } else {
          if (!ops.length) {
            ops.push(token);
            i++;
          } else {
            const lastOp = ops[ops.length - 1];
            if (token === "(" || lastOp === "(") {
              ops.push(token);
              i++;
            } else if (token === ")") {
              while (ops[ops.length - 1] !== "(") {
                const first = numbers.pop();
                const second = numbers.pop();
                if (first && second) {
                  numbers.push(
                    String(calc(first, second, ops[ops.length - 1]))
                  );
                }
                ops.pop();
              }
              ops.pop();
              i++;
            } else {
              if (order[token] > order[lastOp]) {
                ops.push(token);
                i++;
              } else {
                const first = numbers.pop();
                const second = numbers.pop();
                if (first && second) {
                  numbers.push(String(calc(first, second, lastOp)));
                }
                ops.pop();
              }
            }
          }
        }
      }
      while (ops.length) {
        const first = numbers.pop();
        const second = numbers.pop();
        if (first && second) {
          numbers.push(String(calc(first, second, ops[ops.length - 1])));
        }
        ops.pop();
      }
      if (isNaN(numbers[0]) || numbers[0] === "Infinity") {
        setExp("Ошибка!");
      } else {
        setExp(numbers[0]);
      }
    } catch (e) {
      setExp("Ошибка!");
    }
  };

  const backspace = () => {
    setExp((prev) => (prev.length === 1 ? "" : prev.slice(0, -1)));
  };

  const addDot = () => {
    // Проверяем, что точка не была добавлена в последнее число
    const lastNumber = exp.split(/[\+\-\*\/\(\)]/).pop();
    if (lastNumber && !lastNumber.includes(".")) {
      setExp((prev) => prev + ".");
    }
  };

  useEffect(() => {
    const keyUp = (event) => {
      if (event.key === "Backspace") {
        backspace();
      }
    };

    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("keyup", keyUp);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="calc">
          <input
            type="text"
            value={exp}
            onChange={(event) => {
              const value = event.currentTarget.value;
              const regex = /^[\d\+\-\*\/\(\)]+$/;
              if (regex.test(value)) {
                setExp(value);
              }
            }}
            placeholder={"Пример"}
            className="calc_input"
          />
          <div className="calc_actions">
            <div className="calc_brackets">
              <button onClick={() => setExp("")}>AC</button>
              <button onClick={() => setExp((prev) => prev + "(")}>(</button>
              <button onClick={() => setExp((prev) => prev + ")")}>
                )
              </button>
            </div>
            <div className="calc_values">
              {values.map((value) => {
                return (
                  <Button
                    key={value.value}
                    clickHandler={() => {
                      if (value.value === ".") {
                        addDot();
                      } else {
                        setExp((prev) => prev + value.value);
                      }
                    }}
                  >
                    {value.label}
                  </Button>
                );
              })}
            </div>
            <div className="calc_controls">
              {controlValues.map((value) => {
                return (
                  <Button
                    key={value.value}
                    clickHandler={() => {
                      setExp((prev) => prev + value.value);
                    }}
                  >
                    {value.label}
                  </Button>
                );
              })}
              <button
                onClick={() => {
                  execResult();
                }}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
