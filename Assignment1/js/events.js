const display = document.getElementById('display');
const numericButtons = document.querySelectorAll('.btn-numeric');
const operationButtons = document.querySelectorAll('.btn-symbol');

let operand1 = null;
let operand2 = null;
let operator = null;
let shouldResetInput = false;

// Shuffle numeric buttons
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());
const shuffled = numbers.sort(() => Math.random() - 0.5);

numericButtons.forEach((btn, index) => {
const value = shuffled[index % shuffled.length];
btn.textContent = value;
btn.dataset.value = value;
btn.addEventListener('click', () => handleNumericClick(value));
});


const handleNumericClick = (num) => {
if (display.value === '0' || shouldResetInput) {
    display.value = `${num}`;
    shouldResetInput = false;
} else {
    display.value += num;
}
};

const resetCalculator = () => {
operand1 = null;
operand2 = null;
operator = null;
display.value = '0';
shouldResetInput = false;
};

const calculate = (a, b, op) => {
switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    case '%': return a % b;
    default: return 'Error';
}
};

operationButtons.forEach(btn => {
const op = btn.dataset.op;

btn.addEventListener('click', () => {
    if (op === 'CE') return resetCalculator();

    
    if (op === '=') {
    if (operand1 !== null && operator) {
        const currentParts = display.value.split(operator);
        operand2 = parseFloat(currentParts[1]);
        const result = calculate(operand1, operand2, operator);
        display.value = `${operand1} ${operator} ${operand2} = ${result}`;
        operand1 = result;
        operand2 = null;
        operator = null;
        shouldResetInput = true;
    }
    return;
    }

    // Operation clicked
    operand1 = parseFloat(display.value);
    operator = op;
    display.value = `${operand1} ${operator} `;
    shouldResetInput = false;
});
});

// Keyboard support (optional)
document.addEventListener('keydown', (e) => {
const key = e.key;

if (!isNaN(key)) return handleNumericClick(key);

if (['+', '-', '*', '/', '%'].includes(key)) {
    operand1 = parseFloat(display.value);
    operator = key;
    display.value = `${operand1} ${operator} `;
    shouldResetInput = false;
}

if (key === '=' || key === 'Enter') {
    if (operand1 !== null && operator) {
    const currentParts = display.value.split(operator);
    operand2 = parseFloat(currentParts[1]);
    const result = calculate(operand1, operand2, operator);
    // display.value = `${operand1} ${operator} ${operand2} = ${result}`;
    display.value = `${result}`;
    operand1 = result;
    operator = null;
    operand2 = null;
    shouldResetInput = true;
    }
}

if (key === 'Backspace') {
    if (display.value.length === 1 || (display.value.length === 2 && display.value.startsWith('-'))) {
      display.value = '0';
    } else {
      display.value = display.value.slice(0, -1);
    }
  }

if (key === 'Escape') resetCalculator();
});