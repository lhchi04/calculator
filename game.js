let num1;
let num2;
let operator;
let result;
let calculation;

function add(num1, num2) {
  return (num1 + num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return 'Dummy~';
  }
  return num1 / num2;
}

function roundDecimal(num) {
  if (Number.isInteger(num)) {
    return num;
  }
  return num
}

function operate(operator, num1, num2) {
  if (operator == '+') return add(num1, num2);
  else if (operator === '-') return subtract(num1, num2);
  else if (operator === '*') return multiply(num1, num2);
  else return divide(num1, num2);
}

function clear() {
  curDisplay.textContent = '0';
  afterDisplay.textContent = '';
  num1 = 0;
  num2 = 0;
  result = 0;
}

document.addEventListener("DOMContentLoaded", function() {
  clear();
});

const curDisplay = document.querySelector('.cur-display');
const afterDisplay = document.querySelector('.after-display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', () => {
  if (button.className === 'digit') {
    if (curDisplay.textContent === '0' && afterDisplay.textContent === '') { // Clear the default 0 in current display
      curDisplay.textContent = '';
    }
    if (result == curDisplay.textContent && (afterDisplay.textContent === num1.toString()+operator+num2.toString() || afterDisplay.textContent === result)) { // Start a new calculation
      clear();
      curDisplay.textContent = '';
    }
    if (button.textContent === '.') {
      if (curDisplay.textContent.includes('.')) {
      }
      else {
        curDisplay.textContent += button.textContent;
      }
    }
    else {
      curDisplay.textContent += button.textContent;
    }
  }
  else if (button.className === 'operator') {
    if (afterDisplay.textContent === num1.toString() + operator) { // Press operator button before getting result
      if (result === 'Dummy~') {
        clear();
      }
      else {
        num2 = Number(curDisplay.textContent);
        result = operate(operator, num1, num2);
        curDisplay.textContent = result;
      }
    }
    num1 = Number(curDisplay.textContent);
    operator = button.textContent;
    afterDisplay.textContent = curDisplay.textContent + operator;
    curDisplay.textContent = ''; 

  }
  else if (button.className === 'equal') {
    if (afterDisplay.textContent === '') { // Press equal after putting a number only
      result = curDisplay.textContent;
      afterDisplay.textContent = curDisplay.textContent;
    }
    else if (afterDisplay.textContent === num1.toString()+operator+num2.toString() || afterDisplay.textContent === curDisplay.textContent) {} //Press equal after pressing equal
    else {
      if (afterDisplay.textContent === '-') {  // Press minus operator first then a number
        num1 = 0;
      }
      num2 = Number(curDisplay.textContent);
      result = operate(operator, num1, num2);
      afterDisplay.textContent += curDisplay.textContent; 
      curDisplay.textContent = result;
    }
  }
  else if (button.className === 'delete') {
    if (curDisplay.textContent !== '') {
      curDisplay.textContent = curDisplay.textContent.slice(0, curDisplay.textContent.length-1);
    }
  }
  else {
    clear();
  }
}))
  