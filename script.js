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
  if (!operator || !current) return;
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

function appendFunc(func) {
  alert(func + ' function pressed (not implemented yet)');
}

function memory(type) {
  alert('Memory function ' + type + ' clicked (not implemented)');
}
