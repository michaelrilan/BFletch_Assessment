const display = document.getElementById('display');
const numericButtons = document.querySelectorAll('.btn-numeric');
const operationButtons = document.querySelectorAll('.btn-symbol');
let historyDict = {};
const historyContainer = document.querySelector('.hist_container');
const btnHistory = document.getElementById('btnHistory');
const storedHistory = localStorage.getItem('calcHistory');
let historyList = JSON.parse(localStorage.getItem('calcHistory')) || [];

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


const addToHistory = (expression, result) => {
    const timestamp = new Date().toISOString();
    const entry = { timestamp, expression, result };

    // Add new entry to the beginning
    historyList.unshift(entry);
    localStorage.setItem('calcHistory', JSON.stringify(historyList));

    const historyItem = document.createElement('li');
    historyItem.className = 'hist_op';
    historyItem.textContent = `${expression} = ${result}`;
    historyContainer.insertBefore(historyItem, historyContainer.firstChild);

    btnHistory.style.display = 'inline-block';
};


btnHistory.addEventListener('click', () => {
    historyDict = {};
    localStorage.removeItem('calcHistory');
    historyContainer.innerHTML = '';
    btnHistory.style.display = 'none';
});


// const loadHistory = () => {
//     const storedHistory = localStorage.getItem('calcHistory');
//     if (storedHistory) {
//         btnHistory.style.display = 'inline-block';
//         historyDict = JSON.parse(storedHistory);

//         // Sort keys by most recent first
//         const sortedKeys = Object.keys(historyDict).sort().reverse();
//         sortedKeys.forEach(timestamp => {
//             const { expression, result } = historyDict[timestamp];
//             const historyItem = document.createElement('li');
//             historyItem.className = 'hist_op';
//             historyItem.textContent = `${expression} = ${result}`;
//             historyContainer.insertBefore(historyItem, historyContainer.firstChild);
//         });
//     } else {
//         btnHistory.style.display = 'none';
//     }
// };

const loadHistory = () => {
    const storedHistory = localStorage.getItem('calcHistory');
    if (storedHistory) {
        btnHistory.style.display = 'inline-block';
        historyDict = JSON.parse(storedHistory);
            
        // Convert object to array and sort by timestamp descending
        const sortedEntries = Object.entries(historyDict)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]));

        sortedEntries.forEach(([timestamp, { expression, result }]) => {
            const historyItem = document.createElement('li');
            historyItem.className = 'hist_op';
            historyItem.textContent = `${expression} = ${result}`;
            historyContainer.insertBefore(historyItem, historyContainer.firstChild);
        });
    } else {
        btnHistory.style.display = 'none';
    }
};

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

    if (op === '.') {
            const parts = display.value.split(/[\+\-\*\/%]/);
            const currentPart = parts[parts.length - 1];
            if (!currentPart.includes('.')) {
                display.value += '.';
                shouldResetInput = false;
            }
            return;
        }
    
    if (op === '=') {
     
    if (operand1 !== null && operator) {
        const currentParts = display.value.split(operator);
        operand2 = parseFloat(currentParts[1]);
        const result = calculate(operand1, operand2, operator);
        // display.value = `${operand1} ${operator} ${operand2} = ${result}`;
        display.value = `${result}`;
        const expression = `${operand1} ${operator} ${operand2}`;
        addToHistory(expression, result);
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

// Keyboard support
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
    const expression = `${operand1} ${operator} ${operand2}`;
    addToHistory(expression, result);
    operand1 = result;
    operator = null;
    operand2 = null;
    shouldResetInput = true;
    }
}

if (key === '.') {
        const parts = display.value.split(/[\+\-\*\/%]/);
        const currentPart = parts[parts.length - 1];
        if (!currentPart.includes('.')) {
            display.value += '.';
            shouldResetInput = false;
        }
    }

if (key === 'Escape') resetCalculator();

});

loadHistory();