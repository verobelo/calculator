const body = document.querySelector("body");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const decimalButton = document.getElementById("decimal");
const modeToggleButton = document.querySelector(".mode-toggle");
let previousOperandText = document.querySelector(".previous-operand");
let currentOperandText = document.querySelector(".current-operand");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = function (a, b) {
  if (b !== 0) {
    return a / b;
  } else {
    return NaN;
  }
};

let operator = "";
let previousOperand = "";
let currentOperand = "";
let result = "";

for (const number of numberButtons) {
  number.addEventListener("click", (e) => {
    appendNumber(e.target.textContent);
    currentOperandText.textContent = currentOperand;
  });
}

for (const op of operatorButtons) {
  op.addEventListener("click", (e) => {
    appendOperator(e.target.textContent);
    previousOperandText.textContent = previousOperand + operator;
    currentOperandText.textContent = currentOperand;
  });
}
