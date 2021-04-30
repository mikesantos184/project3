
// JS for my calculator date started 4/22/21. 
// modified on 4/26/21.

const calculator = {
    displayValue: '',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
  };
  
  function addNumber(number) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = number;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? number : displayValue + number;
    }
  }
  
  function addDecimal(decimal) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.waitingForSecondOperand = false;
      calculator.displayValue = "."
      return
    }
  
    if (!calculator.displayValue.includes(decimal)) {
      calculator.displayValue += decimal;
    }
  }
  
  function operation(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
    
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      return;
    }
  
  
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
  
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } 
    else if (operator === '-') {
      return firstOperand - secondOperand;
    } 
    
    else if (operator === '*') {
      return firstOperand * secondOperand;
    } 
    
    else if (operator === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }
  
  function clearCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  /* updated 4/28/21 @ 3:00 */

  function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  
  const keys = document.querySelector('.buttons');
  keys.addEventListener('click', event => {
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
      case '=':
        operation(value);
        break;


      case '.':
        addDecimal(value);
        break;

      case 'all-clear':
        clearCalculator();
        break;
        
      default:
        if (Number.isInteger(parseFloat(value))) {
          addNumber(value);
        }
    }
  
    updateDisplay();
  });

  // calculator is working fluently, being able to calc all four functions. 