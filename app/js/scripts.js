let display = "0";
let firstDigitOperating = false;
let operandx
let operation
let operandy
// DO I need to make just Evaluated go to zero after + - / * is pressed?
let justEvaluated = 0;
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
const plusBox = document.querySelector('#plus');
plusBox.addEventListener('click', () => {
    selectPlus();
});
function selectPlus() {
    // if (justEvaluated) {
        clearOperandY();
        justEvaluated = 0;
    // }
    if (!operandx) {
        operandx = display;
    }
    else {
        operandx = operate(operation, operandx, display)
    }
    firstDigitOperating = true;
    operation = "+";
}

const minusBox = document.querySelector('#minus');
minusBox.addEventListener('click', () => {
    selectMinus();
});
function selectMinus() {
    // if (justEvaluated) {
        clearOperandY();
        justEvaluated = 0;
    // }
    if (!operandx) {
        operandx = display;
    }
    else {
        operandx = operate(operation, operandx, display)
    }
    firstDigitOperating = true;
    operation = "-";
}

const multiplyBox = document.querySelector('#multiply');
multiplyBox.addEventListener('click', () => {
    selectMultiply()
});
function selectMultiply() {
    // if (justEvaluated) {
        clearOperandY();
        justEvaluated = 0;
    // }
    if (!operandx) {
        operandx = display;
    }
    else {
        operandx = operate(operation, operandx, display)
    }
    firstDigitOperating = true;
    operation = "*";
}

const divideBox = document.querySelector('#divide');
divideBox.addEventListener('click', () => {
    selectDivide();
});
function selectDivide() {
    // if (justEvaluated) {
        clearOperandY();
        justEvaluated = 0;
    // }
    if (!operandx) {
        operandx = display;
    }
    else {
        operandx = operate(operation, operandx, display)
    }
    firstDigitOperating = true;
    operation = "/";
}

const plusMinusBox = document.querySelector('#plusminus');
plusMinusBox.addEventListener('click', () => {
    selectPlusMinus();
})
function selectPlusMinus() {
    justEvaluated = 0;
    clearOperandX();
    clearOperandY();
    clearOperation();
    display = -Number(display);
    displayBox.textContent = display;
}

const percentageBox = document.querySelector('#percentage');
percentageBox.addEventListener('click', () => {
    selectPercentage();
})
function selectPercentage() {
    justEvaluated = 0;
    clearOperandX();
    clearOperandY();
    clearOperation();
    display = Number(display)/100;
    displayBox.textContent = display;
}

//EQUALS EVENT LISTENER + FUNCTION
//basically runs this : operate(operation, operandx, display)
const equalsBox = document.querySelector('#equals');
equalsBox.addEventListener('click', () => {
    selectEquals();
});
function selectEquals() {
    if (operandx === undefined) {
    }
    else if (justEvaluated) {
        display = operate(operation, operandx, operandy);
        operandx = display;
        justEvaluated = 1;
        displayBox.textContent = display;

    // So if I say 3 + 9 = = = I will get 3 + 9 + 9 + 9 = 30
    // 9 in operand y
    // 30 stored in operand x
    // but then if I press - 6 and press enter I will get 54…
    // what’s happening
    // when i press minus … operandx = operate(operation, operandx, display)
    // BEFORE changing operation and BEFORE changing display
    // operand x becomes operate(+, 30, 30);
    // so operand x becmoes 60
    // and operand y becomes 6 based off of equals
    // then i press enter and it does this:
    // display = operate(minus, 60, 6)

    // THERES EVEN MORE WEIRDNESS IF I KEEP PRESSING MINUS… operandx keeps changing!
    // do i need to scrap this??

    } else {
        operandy = display;
        display = operate(operation, operandx, operandy);
        operandx = display;
        justEvaluated = 1;
        displayBox.textContent = display;
    }
    
}

//CLEAR EVENT LISTENER FUNCTION (is this what we want it to do…?)
const clearBox = document.querySelector('#clear');
clearBox.addEventListener('click', () => {
    clearDisplay();
    clearOperandX();
    clearOperandY();
    clearOperation();
    displayBox.textContent = display;
})
function clearDisplay() {
    display = "0"
}
function clearOperandX() {
    operandx = undefined
}
function clearOperandY() {
    operandy = undefined
}
function clearOperation() {
    operation = ""
}

// FUNCTION THAT ADDS SELECTION TO DISPLAY
function addSelectionToDisplay(selection) {
    if (justEvaluated) {
        clearOperandX();
        clearOperandY();
    }
    if (firstDigitOperating) {
        clearDisplay();
        firstDigitOperating = 0;
    }
    if (display === "0" || display === -0 || justEvaluated) {
        if ((display === "0" || display === -0) & selection === '.') {
            display = '0' + selection;
        } else {
            display = selection;
        }
        displayBox.textContent = display;
        justEvaluated = 0;
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