let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let justCalculated = false;

function appendToDisplay(value) {
    if (justCalculated) {
        if (['+', '-', '*', '/'].includes(value)) {
            previousInput = display.value;
            operator = value;
            currentInput = '';
            justCalculated = false;
        } else {
            clearDisplay();
            justCalculated = false;
        }
    }

    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput !== '' && operator !== '' && previousInput !== '') {
            calculateResult();
            previousInput = display.value;
        } else if (currentInput !== '') {
            previousInput = currentInput;
        }
        operator = value;
        currentInput = '';
    } else {
        if (value === '.' && currentInput.includes('.')) {
            return;
        }
        currentInput += value;
        display.value = currentInput;
    }
}

function calculateResult() {
    if (previousInput !== '' && currentInput !== '' && operator !== '') {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    display.value = 'Error';
                    resetCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Format result to avoid floating point issues
        result = Math.round(result * 100000000) / 100000000;
        display.value = result.toString();

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        justCalculated = true;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
    justCalculated = false;
}

function deleteLast() {
    if (justCalculated) {
        clearDisplay();
        return;
    }

    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function resetCalculator() {
    setTimeout(() => {
        clearDisplay();
    }, 1500);
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Initialize display
display.placeholder = '0';