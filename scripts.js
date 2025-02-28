document.addEventListener('DOMContentLoaded', (event) => {
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function updateDisplay() {
        const display = document.querySelector('.calculator-screen');
        display.value = calculator.displayValue;
    }

    updateDisplay();

    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', (event) => {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                handleEqualSign();
                break;
            case '.':
                inputDecimal(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                if (Number.isInteger(parseFloat(value))) {
                    inputDigit(value);
                }
        }

        updateDisplay();
    });

    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;

        if (waitingForSecondOperand) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand) return;

        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            calculator.displayValue = `${calculator.displayValue} ${nextOperator}`;
            return;
        }

        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${result} ${nextOperator}`;
            calculator.firstOperand = result;
        } else {
            calculator.displayValue = `${calculator.displayValue} ${nextOperator}`;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        if (operator === '+') {
            return firstOperand + secondOperand;
        } else if (operator === '-') {
            return firstOperand - secondOperand;
        } else if (operator === '*') {
            return firstOperand * secondOperand;
        } else if (operator === '/') {
            return firstOperand / secondOperand;
        }

        return secondOperand;
    }

    function handleEqualSign() {
        const { firstOperand, displayValue, operator } = calculator;
        const secondOperand = parseFloat(displayValue.split(' ').pop());

        if (operator && firstOperand != null) {
            const result = calculate(firstOperand, secondOperand, operator);
            calculator.displayValue = `${result}`;
            calculator.firstOperand = null;
            calculator.operator = null;
            calculator.waitingForSecondOperand = false;
        }
    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }
});
