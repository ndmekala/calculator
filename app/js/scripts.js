let display = "0";
let memory = []
let firstDigitOperating = false;

let displayBox = document.querySelector('#display')
displayBox.textContent = display;


// OPERATION FUNCTIONS
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    if (operator === "+") {
        return add(Number(x),Number(y));
    } else if (operator === "-") {
        return subtract(Number(x),Number(y));
    } else if (operator === "*") {
        return multiply(Number(x),Number(y));
    } else if (operator === "/") {
        return divide(Number(x),Number(y));
    }
}

function storeVars(x, op, y, button) {
    memory.push({
        operandx: x,
        operator: op,
        operandy: y,
        result: operate(op, x, y),
        pressed: button,
    })
}

// EVENT LISTENERS FOR NUMBER BUTTONS
//Why do I get the error that display.concat is not a function specifically when 
const one = document.querySelector('#one');
one.addEventListener('click', () => {
    addSelectionToDisplay('1');
});

const two = document.querySelector('#two');
two.addEventListener('click', () => {
    addSelectionToDisplay('2');
});

const three = document.querySelector('#three');
three.addEventListener('click', () => {
    addSelectionToDisplay('3');
});

const four = document.querySelector('#four');
four.addEventListener('click', () => {
    addSelectionToDisplay('4');
});

const five = document.querySelector('#five');
five.addEventListener('click', () => {
    addSelectionToDisplay('5');
});

const six = document.querySelector('#six');
six.addEventListener('click', () => {
    addSelectionToDisplay('6');
});

const seven = document.querySelector('#seven');
seven.addEventListener('click', () => {
    addSelectionToDisplay('7');
});

const eight = document.querySelector('#eight');
eight.addEventListener('click', () => {
    addSelectionToDisplay('8');
});

const nine = document.querySelector('#nine');
nine.addEventListener('click', () => {
    addSelectionToDisplay('9');
});

const zero = document.querySelector('#zero');
zero.addEventListener('click', () => {
    addSelectionToDisplay('0');
});

const decimal = document.querySelector('#decimal');
decimal.addEventListener('click', () => {
    addSelectionToDisplay('.');
});

// EVENT LISTENERS AND FUNCTIONS FOR OPERATION BUTTONS
// Idea is to also make these highlight the chosen button (like iOS)
// thse dont work when you go *back* to them from pressing equals because last pressed = "=", which crashes operate() via storeVars
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

function select(opclicked) {
    if (memory[memory.length-1]) {
        // if you’re calculating based on something that itself was calculated
        if (memory[memory.length-1].result) {
            storeVars(memory[memory.length-1].result, memory[memory.length-1].pressed, display, opclicked);
            display = memory[memory.length-1].result;
        }
        // if you just entered the first thing
        else {
            storeVars(memory[memory.length-1].operandx, memory[memory.length-1].pressed, display, opclicked)
            display = memory[memory.length-1].result
        }
    }
    // if you’re putting in the first thing    
    else {
        storeVars(display,undefined,undefined, opclicked)
    }
    displayBox.textContent = display;
    firstDigitOperating = true;
}

const plusMinusBox = document.querySelector('#plusminus');
plusMinusBox.addEventListener('click', () => {
    selectPlusMinus();
})
function selectPlusMinus() {
    
}

const percentageBox = document.querySelector('#percentage');
percentageBox.addEventListener('click', () => {
    selectPercentage();
})
function selectPercentage() {
    
}

//EQUALS EVENT LISTENER + FUNCTION
const equalsBox = document.querySelector('#equals');
equalsBox.addEventListener('click', () => {
    selectEquals();
});
function selectEquals() {
    // if you’re calculating on something that was itself calculated
    if (memory[memory.length-2]) {
        for (i = memory.length-1; i >= 0; i--) {
            if (memory[i].pressed !== "=") {
                storeVars(memory[memory.length-1].result, memory[i].pressed, memory[memory.length-1].operandy, '=')
                break
            }
        }
    }
    // if you’re calculating the very first equation
    else if (memory[memory.length-1]) {
        storeVars(memory[memory.length-1].operandx, memory[memory.length-1].pressed, display, '=')
    }
    display = memory[memory.length-1].result;
    displayBox.textContent = display;
}

//CLEAR EVENT LISTENER FUNCTION (is this what we want it to do…?)
const clearBox = document.querySelector('#clear');
clearBox.addEventListener('click', () => {
    memory = []
    clearDisplay();
    displayBox.textContent = display;
})
function clearDisplay() {
    display = "0"
}

// FUNCTION THAT ADDS SELECTION TO DISPLAY
function addSelectionToDisplay(selection) {
    if (firstDigitOperating) {
        clearDisplay();
        firstDigitOperating = 0;
    }
    if (display === "0" || display === -0) {
        if ((display === "0" || display === -0) & selection === '.') {
            display = '0' + selection;
        } else {
            display = selection;
        }
        displayBox.textContent = display;
    } else {
        display = display.toString();
        if (selection !== "." || display.indexOf('.') === -1) {
            display = display.concat(selection);
            displayBox.textContent = display;
        }
    }
}

// there’s some seriously weird behavior.
// for example: operand x and y remain when you go from pressing enter a bunch to entering numbers. so if you select enter again… IT HAS IDEAS