const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  // calculatorDisplay.textContent = number;
  //replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

console.log(inputBtns);

function addDecimal() {
  //if operator pressed , dont add decimal
  if (awaitingNextValue) return;
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// calc first and second values, depending on operator

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  //prevent multiple operators
  if (operator && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  //assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    // console.log(firstValue, operatorValue, currentValue);

    const calculation = calculate[operatorValue](firstValue, currentValue);
    //console.log(calculation);

    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //redy for next value, stor operator
  awaitingNextValue = true;
  operatorValue = operator;
  // console.log(firstValue);
  //console.log(operatorValue);
}

//add event listeners for numbers, operators decimal btns
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

//reset all values and display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

//el
clearBtn.addEventListener("click", resetAll);
