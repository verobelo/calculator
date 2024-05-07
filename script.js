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
    e.target.blur();
  });
}

for (const op of operatorButtons) {
  op.addEventListener("click", (e) => {
    appendOperator(e.target.textContent);
    previousOperandText.textContent = previousOperand + operator;
    currentOperandText.textContent = currentOperand;
    e.target.blur();
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
    e.target.blur();
  }
});

decimalButton.addEventListener("click", (e) => {
  if (!currentOperand.includes(".")) {
    currentOperand += number;
    e.target.blur();
  } else {
    decimalButton.disabled = true;
  }
});

clearButton.addEventListener("click", (e) => {
  clearDisplay();
  e.target.blur();
});

function clearDisplay() {
  previousOperandText.textContent = "";
  currentOperandText.textContent = "";
  operator = "";
  previousOperand = "";
  currentOperand = "";
}

document.addEventListener("keydown", (e) => {
  const numRegex = /\d/g;
  const opRegex = /[+\-*/]/g;
  if (e.key.match(numRegex)) {
    appendNumber(e.key);
    currentOperandText.textContent = currentOperand;
  } else if (e.key.match(opRegex)) {
    appendOperator(e.key);
    previousOperandText.textContent = previousOperand + " " + operator;
    currentOperandText.textContent = currentOperand;
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (previousOperand !== "" && operator !== "" && currentOperand !== "") {
      result = calculate(previousOperand, operator, currentOperand);
      previousOperandText.textContent = "";
      currentOperandText.textContent = Math.round(result * 100) / 100;
    }
  } else if (e.key === "Delete") {
    clearDisplay();
  }
});

modeToggleButton.addEventListener("click", (e) => {
  body.classList.toggle("dark-mode");
  e.target.blur();
});
