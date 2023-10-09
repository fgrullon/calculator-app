import styles from "./calculator.module.css";
import { useReducer } from "react";

function formatResult(result: number): string {
  return new Intl.NumberFormat().format(result);
}

function calculatorReducer(
  state: {
    result: number;
    currentDigit: string;
    operation: string;
    prevDigit: number;
  },
  action: { type: string; value: string }
) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        currentDigit: `${state.currentDigit === "0" ? "" : state.currentDigit}${
          action.value
        }`,
      };
    case "reset":
      return {
        ...initialState,
      };
    case "DEL":
      return {
        ...state,
        currentDigit: "0",
      };
    case "+":
      return {
        ...state,
        prevDigit: parseFloat(state.currentDigit),
        currentDigit: "0",
        operation: "+",
      };
    case "-":
      return {
        ...state,
        prevDigit: parseFloat(state.currentDigit),
        currentDigit: "0",
        operation: "-",
      };
    case "/":
      return {
        ...state,
        prevDigit: parseFloat(state.currentDigit),
        currentDigit: "0",
        operation: "/",
      };
    case "x":
      return {
        ...state,
        prevDigit: parseFloat(state.currentDigit),
        currentDigit: "0",
        operation: "*",
      };
    case "=":
      return {
        ...initialState,
        currentDigit: eval(
          `${state.prevDigit} ${state.operation}${state.currentDigit}`
        ),
      };
    default:
      throw new Error(`${action.type} not supported.`);
  }
}

const initialState = {
  result: 0,
  currentDigit: "0",
  prevDigit: 0,
  operation: "",
};

function Calculator() {
  const [state, dispath] = useReducer(calculatorReducer, initialState);
  console.log("di", state.currentDigit);
  return (
    <div className={styles.hero}>
      <div className={styles.header}>
        <h1 className={styles.title}>calc</h1>
      </div>
      <div className={styles.display}>
        <div>
          {formatResult(
            parseFloat(
              state.prevDigit && state.currentDigit == "0"
                ? state.prevDigit
                : state.currentDigit
            )
          )}
        </div>
      </div>
      <form className={styles.keyboard}>
        <div className={styles.mainKeyboard}>
          <div className={styles.other}>
            <div className={styles.digits}>
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((digit) => (
                <button
                  key={digit}
                  className={styles.digit_btn}
                  type="button"
                  onClick={() =>
                    dispath({ type: "add", value: digit.toString() })
                  }
                >
                  {digit}
                </button>
              ))}
            </div>
            <div className={styles.pointers}>
              {[".", "/", 0].map((pointer) => (
                <button
                  key={pointer}
                  className={styles.pointer_btn}
                  type="button"
                  onClick={() =>
                    dispath({
                      type: pointer === "/" ? "/" : "add",
                      value: pointer.toString(),
                    })
                  }
                >
                  {pointer}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.functions}>
            {["DEL", "+", "-", "x"].map((func) => (
              <button
                key={func}
                className={`${styles.func_btn} ${
                  func === "DEL" ? styles.delete_btn : null
                }`}
                type="button"
                onClick={() => dispath({ type: func, value: "0" })}
              >
                {func}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.reset_btn}
            onClick={() => dispath({ type: "reset", value: "0" })}
          >
            RESET
          </button>
          <button
            type="button"
            className={styles.equals_btn}
            onClick={() => dispath({ type: "=", value: "0" })}
          >
            =
          </button>
        </div>
      </form>
    </div>
  );
}

export default Calculator;
