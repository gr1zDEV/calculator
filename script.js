let display = document.getElementById('display');
let current = '';
let previous = '';
let operator = null;

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
  operator = op;
  previous = current;
  current = '';
}

function calculate() {
  if (operator === null || current === '') return;
  let result;
  const prev = parseFloat(previous);
  const curr = parseFloat(current);
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

function calculateScientific(func) {
  let val = parseFloat(current);
  switch (func) {
    case 'sin': current = Math.sin(val).toString(); break;
    case 'cos': current = Math.cos(val).toString(); break;
    case 'tan': current = Math.tan(val).toString(); break;
    case 'log': current = Math.log10(val).toString(); break;
    case 'ln': current = Math.log(val).toString(); break;
    case 'sqrt': current = Math.sqrt(val).toString(); break;
    case 'square': current = (val * val).toString(); break;
    case 'inv': current = (1 / val).toString(); break;
  }
  updateDisplay();
}

function appendConstant(constant) {
  if (constant === 'π') current += Math.PI.toString();
  if (constant === 'e') current += Math.E.toString();
  updateDisplay();
}

document.addEventListener('keydown', function(e) {
  if (!isNaN(e.key)) appendNumber(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) setOperation(e.key);
  else if (e.key === 'Enter') calculate();
  else if (e.key === '.') appendNumber('.');
  else if (e.key === 'Backspace') current = current.slice(0, -1), updateDisplay();
  else if (e.key.toLowerCase() === 'c') clearDisplay();
});