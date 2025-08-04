const display = document.getElementById('display');
const calculator = document.getElementById('calculator');
const toggleButton = document.getElementById('toggleScientific');
let current = '';
let previous = '';
let operator = null;

document.querySelector('.buttons').addEventListener('click', function (e) {
  const value = e.target.textContent.trim();
  if (!value) return;

  if (!isNaN(value)) appendNumber(value);
  else if (value === '.') appendNumber(value);
  else if (value === 'AC') clearDisplay();
  else if (value === '±') toggleSign();
  else if (value === '%') percent();
  else if (['+', '-', '×', '÷'].includes(value)) setOperation(value);
  else if (value === '=') calculate();
});

toggleButton.addEventListener('click', () => {
  calculator.classList.toggle('scientific-mode');
  toggleButton.textContent = calculator.classList.contains('scientific-mode')
    ? '➖ Standard Mode'
    : '🧪 Scientific Mode';
});

function appendNumber(num) {
  if (num === '.' && current.includes('.')) return;
  current += num;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = current || '0';
}

function clearDisplay() {
  current = '';
  previous = '';
  operator = null;
  updateDisplay();
}

function toggleSign() {
  if (current) current = (parseFloat(current) * -1).toString();
  updateDisplay();
}

function percent() {
  if (current) current = (parseFloat(current) / 100).toString();
  updateDisplay();
}

function setOperation(op) {
  if (current === '') return;
  if (previous !== '') calculate();
  operator = op.replace('×', '*').replace('÷', '/');
  previous = current;
  current = '';
}

function calculate() {
  if (!operator || !current) return;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
  let result;

  switch (operator) {
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/': result = prev / curr; break;
    default: return;
  }

  current = result.toString();
  operator = null;
  previous = '';
  updateDisplay();
}
