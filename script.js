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

function appendNumber(number) {
  if (currentOperand.length <= 5) {
    currentOperand += number;
  }
}

function appendOperator(op) {
  if (previousOperand !== "" && operator !== "") {
    result = calculate(previousOperand, operator, currentOperand);
    previousOperand = result;
    operator = op;
    currentOperand = "";
    decimalButton.disabled = false;
  } else {
    operator = op;
    previousOperand = currentOperand;
    currentOperand = "";
    decimalButton.disabled = false;
  }
}

function calculate(previousOperand, operator, currentOperand) {
  previousOperand = Number(previousOperand);
  currentOperand = Number(currentOperand);
  switch (operator) {
    case "+":
      return add(previousOperand, currentOperand);
      break;
    case "-":
      return subtract(previousOperand, currentOperand);
      break;
    case "*":
      return multiply(previousOperand, currentOperand);
      break;
    case "/":
      return divide(previousOperand, currentOperand);
      break;
  }
}

equalButton.addEventListener("click", (e) => {
  if (previousOperand !== "" && operator !== "" && currentOperand !== "") {
    result = calculate(previousOperand, operator, currentOperand);
    previousOperandText.textContent = "";
    currentOperandText.textContent = Math.round(result * 100) / 100;
  }
});

decimalButton.addEventListener("click", (e) => {
  if (!currentOperand.includes(".")) {
    currentOperand += number;
  } else {
    decimalButton.disabled = true;
  }
});

clearButton.addEventListener("click", clearDisplay);

function clearDisplay() {
  previousOperandText.textContent = "";
  currentOperandText.textContent = "";
  operator = "";
  previousOperand = "";
  currentOperand = "";
}
