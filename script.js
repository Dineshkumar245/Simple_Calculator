// JavaScript Logic for Calculator
let display = document.getElementById('display');

// Function to clear the display
function clearDisplay() {
  display.textContent = '0';
}

// Function to delete the last character
function deleteLast() {
  display.textContent = display.textContent.slice(0, -1) || '0';
}

// Function to append symbols/numbers to the display
function appendSymbol(symbol) {
  // Limit input to 15 characters
  if (display.textContent.length < 15 || isNaN(symbol)) {
    if (display.textContent === '0' && !isNaN(symbol)) {
      display.textContent = symbol;
    } else {
      display.textContent += symbol;
    }
  }
}

// Function to calculate the result
function calculate() {
  try {
    let result = eval(display.textContent.replace('÷', '/').replace('×', '*'));
    
    // Check if the result is a large number (more than 15 characters)
    if (result.toString().length > 15 || Math.abs(result) >= 1e12) {
      // Convert result to scientific notation (e.g., 1.23e+12)
      result = result.toExponential(5);
    }
    display.textContent = result;
  } catch {
    display.textContent = 'Error';
  }
}

// Keyboard Input Handling
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Handle number and operator keys
  if ('0123456789'.includes(key)) {
    appendSymbol(key);
  }
  // Handle operator keys
  if ('+-*/'.includes(key)) {
    appendSymbol(key === '*' ? '×' : key === '/' ? '÷' : key);
  }
  // Handle Enter key (equals)
  if (key === 'Enter') {
    calculate();
  }
  // Handle the Delete key (clear)
  if (key === 'Backspace') {
    deleteLast();
  }
  // Handle the Escape key (reset to zero)
  if (key === 'Escape') {
    clearDisplay();
  }
});
