let display = "0";
let memory = []
let firstDigitOperating = false;
let allClear = true;
let editing = true;
let displayBox = document.querySelector('#display')
displayBox.textContent = display;

//REPOSITORY LINK
const repository = document.querySelector('#home')
repository.addEventListener('click', () => {
    window.location.href = 'https://github.com/ndmekala/calculator';
})


// OPERATION FUNCTIONS
function add(x, y) {
    return (100*x + 100*y)/100;
}
function subtract(x, y) {
    return (100*x - 100*y)/100;
}
function multiply(x, y) {
    return (100*x * 100*y)/(100*100);
}
function divide(x, y) {
    return 100 * x / (100 * y);
}

function operate(operator, x, y) {
    if (operator === "+") {
        return add(Number(x),Number(y));
    } else if (operator === "-") {
        return subtract(Number(x),Number(y));
    } else if (operator === "*") {
        return multiply(Number(x),Number(y));
    } else if (operator === "/") {
        if (Number(y) === 0) {
            return NaN;
        }
        else {
            return divide(Number(x),Number(y));
        }
    }
}

// MEMORY STORAGE
function storeVars(a, b, c, d, e) {
    memory.push({
        operandx: a,
        operator: b,
        operandy: c,
        result: d,
        pressed: e,
    })
}

// CLICK EVENT LISTENERS FOR NUMBER BUTTONS
const numeric = Array.from(document.querySelectorAll('.numeric'));
numeric.forEach(button => button.addEventListener('click', () => {
    if (button.id === 'one')        {addSelectionToDisplay('1')};
    if (button.id === 'two')        {addSelectionToDisplay('2')};
    if (button.id === 'three')      {addSelectionToDisplay('3')};
    if (button.id === 'four')       {addSelectionToDisplay('4')};
    if (button.id === 'five')       {addSelectionToDisplay('5')};
    if (button.id === 'six')        {addSelectionToDisplay('6')};
    if (button.id === 'seven')      {addSelectionToDisplay('7')};
    if (button.id === 'eight')      {addSelectionToDisplay('8')};
    if (button.id === 'nine')       {addSelectionToDisplay('9')};
    if (button.id === 'zero')       {addSelectionToDisplay('0')};
    if (button.id === 'decimal')    {addSelectionToDisplay('.');
}}));
// KEYBOARD EVENT LISTENERS
window.addEventListener('keydown', event => {
    if (Number(event.key) ||
        event.key === '0' ||
        event.key === '.') {
        addSelectionToDisplay(event.key.toString());
    }
    if (event.key === '%') {
        selectPercentage();
    }
    if (event.key === '+' ||
        event.key === '-' ||
        event.key === '*' ||
        event.key === '/') {
        select(event.key);
    }
    if (event.key === '=' ||
        event.key === 'Enter') {
        selectEquals();
    }
    if (event.key === 'c') {
        selectClear();
    }
    if (event.key === 'Backspace') {
        deleteLast();
    }
})

// CLICK EVENT LISTENERS AND FUNCTIONS FOR OPERATION BUTTONS
const plusBox = document.querySelector('#plus');
plusBox.addEventListener('click', () => {
    select('+');
});
const minusBox = document.querySelector('#minus');
minusBox.addEventListener('click', () => {
    select('-');
});
const multiplyBox = document.querySelector('#multiply');
multiplyBox.addEventListener('click', () => {
    select('*')
});
const divideBox = document.querySelector('#divide');
divideBox.addEventListener('click', () => {
    select('/')
});

function highlightSelectedOperator(operator) {
    if (operator === '+') {
        plusBox.classList.add('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.remove('selected');
    }
    else if (operator === '-') {
        plusBox.classList.remove('selected');
        minusBox.classList.add('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.remove('selected');
    }
    else if (operator === '*') {
        plusBox.classList.remove('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.add('selected');
        divideBox.classList.remove('selected');
    }
    else if (operator === '/') {
        plusBox.classList.remove('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.add('selected');
    }
}

function select(funcoperator) {
    editing = true;
    highlightSelectedOperator(funcoperator);
    if (!memory[0] || 
         memory[memory.length-1].pressed === '=' || 
         memory[memory.length-1].pressed === 'clr') {
        storeVars(
            undefined,
            undefined,
            display,
            display,
            funcoperator
        )
    }
    else {
        if (!firstDigitOperating) {
            storeVars(
                memory[memory.length-1].result,
                memory[memory.length-1].pressed,
                display,
                operate(memory[memory.length-1].pressed, memory[memory.length-1].result, display),
                funcoperator
            )
        }
    }
    display = memory[memory.length-1].result
    updateDisplay();
    firstDigitOperating = true;
}

const plusMinusBox = document.querySelector('#plusminus');
plusMinusBox.addEventListener('click', () => {
    selectPlusMinus();
})
function selectPlusMinus() {
    display = -Number(display)*100;
    display = display/100
    editing = false;
    updateDisplay();
}

const percentageBox = document.querySelector('#percentage');
percentageBox.addEventListener('click', () => {
    selectPercentage();
})
function selectPercentage() {
    display = Number(display) * 0.01;
    editing = false;
    updateDisplay();
}

//EQUALS CLICK EVENT LISTENER + FUNCTION
const equalsBox = document.querySelector('#equals');
equalsBox.addEventListener('click', () => {
    selectEquals();
});
function selectEquals() {
    plusBox.classList.remove('selected');
    minusBox.classList.remove('selected');
    multiplyBox.classList.remove('selected');
    divideBox.classList.remove('selected');
    if(memory[0]) {
        if (memory[memory.length-1].pressed === '=' ||
            memory[memory.length-1].pressed === 'clr') {
            storeVars(
                display,
                memory[memory.length-1].operator,
                memory[memory.length-1].operandy,
                operate(memory[memory.length-1].operator, display, memory[memory.length-1].operandy),
                '='
            );
        }   
        else {
            storeVars(
                memory[memory.length-1].result,
                memory[memory.length-1].pressed,
                display,
                operate(memory[memory.length-1].pressed, memory[memory.length-1].result, display),
                '='
            );
        }
        display = memory[memory.length-1].result;
    }
    editing = false;
    updateDisplay();
}

//CLEARING CLICK EVENT LISTENERS + FUNCTIONS
const clearBox = document.querySelector('#clear');
clearBox.addEventListener('click', () => {
    selectClear();
})

function selectClear() {
    editing = true;
    if (allClear) {
        memory = []
        clearDisplay();
        displayBox.textContent = display;
        plusBox.classList.remove('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.remove('selected');
    }
    else {
        clearVars();
        clearDisplay();
        displayBox.textContent = display;
        allClear = true
        clearBox.textContent = "AC"
        plusBox.classList.remove('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.remove('selected');
    }
}

function clearDisplay() {
    display = "0"
}
function clearVars() {
    if (memory[0]) {
        let saveOp = memory[memory.length-1].operator;
        let saveY = memory[memory.length-1].operandy;
        memory = [];
        storeVars(
            undefined,
            saveOp,
            saveY,
            saveY,
            'clr',
        );
    }
}
function allClearToClear() {
    clearBox.textContent = "C"
    allClear = false
}

// DISPLAY FUNCTIONS
function addSelectionToDisplay(selection) {
    if (display.toString().length < 12) {
        if (memory[0]) {
            if (memory[memory.length-1].pressed === '=') {
                clearVars();
                clearDisplay();
            }
        }
        if (firstDigitOperating) {
            clearDisplay();
            firstDigitOperating = 0;
            plusBox.classList.remove('selected');
            minusBox.classList.remove('selected');
            multiplyBox.classList.remove('selected');
            divideBox.classList.remove('selected');
        }
        if (display === "0" || display === -0) {
            if ((display === "0" || display === -0) & selection === '.') {
                display = '0' + selection;
            } else {
                display = selection;
            }
            displayBox.textContent = display;
            allClearToClear();
        } else {
            display = display.toString();
            if (selection !== "." || display.indexOf('.') === -1) {
                display = display.concat(selection);
                displayBox.textContent = display;
                allClearToClear();
            }
        }
    }
}

function updateDisplay() {
    if (display !== display) {
        display = "Error!";
    }
    else if (Number(display+'e3') % 1 !== 0 || display.toString().length > 12) {
        display = parseFloat(display).toExponential(5);
    }
    else {
        display = Number(display);
    }
    displayBox.textContent = display;
}

function deleteLast() {
    if (!firstDigitOperating & editing) {
        display = display.toString();
        display = display.slice(0, -1);
        if (!display) {
        display = 0;
        }
        displayBox.textContent = display;
    }
}