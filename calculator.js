// Math Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Oops.";
    }
    return a / b;
}

function modulo(a, b) {
    if (b === 0) {
        return a;
    }
    return a % b;
}

// INPUT VARIABLES
let firstUserNumber = null;
let secondUserNumber = null;
let operator = null;
let displayNumber = 0;
let result = null;
let readyForInput = true;
let voiceEnabled = true; // Enable or disable voice feature

//Set Operators

function operate(firstNumber, secondNumber, userOperator) {
    if (userOperator == "+") {
        return add(firstNumber, secondNumber);
    }
    if (userOperator == "-") {
        return subtract(firstNumber, secondNumber);
    }
    if (userOperator == "*") {
        return multiply(firstNumber, secondNumber);
    }
    if (userOperator == "/") {
        return divide(firstNumber, secondNumber);
    }
    if (userOperator == "%") {
        return modulo(firstNumber, secondNumber);
    }
}

// Speak result using Web Speech API
function speakResult(text) {
    if ('speechSynthesis' in window && voiceEnabled) {
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
}

// query selectors and adding event listeners
let display = document.querySelector(".display");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");
let zero = document.querySelector(".zero");
let dot = document.querySelector(".dot");

let plusButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
let moduloButton = document.querySelector(".modulo");
let signButton = document.querySelector(".sign");
let clearButton = document.querySelector(".clear");
let equalsButton = document.querySelector(".equals");

one.addEventListener("click", () => displayValue("1"));
two.addEventListener("click", () => displayValue("2"));
three.addEventListener("click", () => displayValue("3"));
four.addEventListener("click", () => displayValue("4"));
five.addEventListener("click", () => displayValue("5"));
six.addEventListener("click", () => displayValue("6"));
seven.addEventListener("click", () => displayValue("7"));
eight.addEventListener("click", () => displayValue("8"));
nine.addEventListener("click", () => displayValue("9"));
zero.addEventListener("click", () => displayValue("0"));
dot.addEventListener("click", () => displayValue("."))

plusButton.addEventListener("click", () => operatorInput("+"));
minusButton.addEventListener("click", () => operatorInput("-"));
multiplyButton.addEventListener("click", () => operatorInput("*"));
divideButton.addEventListener("click", () => operatorInput("/"));
moduloButton.addEventListener("click", () => operatorInput("%"));
signButton.addEventListener("click", () => changeSign());

clearButton.addEventListener("click", () => clear());
equalsButton.addEventListener("click", () => equals())

// function clear the calculator
function clear() {
    displayNumber = 0;
    display.textContent = displayNumber;
    firstUserNumber = null;
    secondUserNumber = null;
    operator = null;
}

// function to add the operator to the equation
function operatorInput(userOperator) {
    if (operator != null) {
        equals();
    }
    if (operator === null) {
        operator = userOperator;
        firstUserNumber = displayNumber;
        displayNumber = 0;
        display.textContent = `${firstUserNumber} ${operator}`;
    }
}

// function for when you hit the equals sign
function equals() {
    if (firstUserNumber && operator) {
        secondUserNumber = displayNumber;
        result = operate(parseFloat(firstUserNumber), parseFloat(secondUserNumber), operator);
        if (isNaN(result)) {
            display.textContent = result;
        } else {
            display.textContent = parseFloat(result.toPrecision(9));
        }
        firstUserNumber = result;
        displayNumber = result;
        operator = null;
        secondUserNumber = null;
        readyForInput = false;

        // Speak the result
        speakResult(display.textContent);
    }
}

// function to change it to negative or positive
function changeSign() {
    if (parseFloat(displayNumber) != 0) {
        displayNumber = parseFloat(displayNumber) * -1;
        display.textContent = displayNumber;
    }
}

// function for displaying a value
function displayValue(number) {
    if (number === ".") {
        if (displayNumber === 0 || displayNumber == result) {
            displayNumber = "0.";
        } else if (displayNumber.toString().indexOf(".") == -1) {
            displayNumber += ".";
        }
    } else if (displayNumber == 0 || displayNumber == result) {
        displayNumber = number;
    } else {
        displayNumber += number;
    }
    display.textContent = displayNumber;
}

// Sets initial display content to 0
clear();
