let display = "0";
let memory = []
let firstDigitOperating = false;
let allClear = true;


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
        return divide(Number(x),Number(y));
    }
}

function storeVars(a, b, c, d, e) {
    memory.push({
        operandx: a,
        operator: b,
        operandy: c,
        result: d,
        pressed: e,
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

window.addEventListener('keydown', event => {
    if (event.key === '1') {
        addSelectionToDisplay('1');
    }
    if (event.key === '2') {
        addSelectionToDisplay('2');
    }
    if (event.key === '3') {
        addSelectionToDisplay('3');
    }
    if (event.key === '4') {
        addSelectionToDisplay('4');
    }
    if (event.key === '5') {
        addSelectionToDisplay('5');
    }
    if (event.key === '6') {
        addSelectionToDisplay('6');
    }
    if (event.key === '7') {
        addSelectionToDisplay('7');
    }
    if (event.key === '8') {
        addSelectionToDisplay('8');
    }
    if (event.key === '9') {
        addSelectionToDisplay('9');
    }
    if (event.key === '0') {
        addSelectionToDisplay('0');
    }
    if (event.key === '.') {
        addSelectionToDisplay('.');
    }
    if (event.key === '%') {
        selectPercentage();
    }
    if (event.key === '+') {
        select('+');
    }
    if (event.key === '-') {
        select('-');
    }
    if (event.key === '*') {
        select('*')
    }
    if (event.key === '/') {
        select('/')
    }
    if (event.key === '=') {
        selectEquals();
    }
    if (event.key === 'Enter') {
        selectEquals();
    }
    if (event.key === 'c') {
        selectClear();
    }
})

// EVENT LISTENERS AND FUNCTIONS FOR OPERATION BUTTONS
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
        storeVars(
            memory[memory.length-1].result,
            memory[memory.length-1].pressed,
            display,
            operate(memory[memory.length-1].pressed, memory[memory.length-1].result, display),
            funcoperator
        )
    }
    display = memory[memory.length-1].result
    displayBox.textContent = display;
    firstDigitOperating = true;
}

const plusMinusBox = document.querySelector('#plusminus');
plusMinusBox.addEventListener('click', () => {
    selectPlusMinus();
})
function selectPlusMinus() {
    display = -Number(display)*100;
    display = display/100
    displayBox.textContent = display;
}

const percentageBox = document.querySelector('#percentage');
percentageBox.addEventListener('click', () => {
    selectPercentage();
})
function selectPercentage() {
    display = Number(display) * 0.01;
    displayBox.textContent = display;
}

//EQUALS EVENT LISTENER + FUNCTION
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
    displayBox.textContent = display;
}



//CLEAR EVENT LISTENER FUNCTION (is this what we want it to do…?)
const clearBox = document.querySelector('#clear');
clearBox.addEventListener('click', () => {
    selectClear();
})

function selectClear() {
    if (allClear) {
        memory = []
        clearDisplay();
        displayBox.textContent = display;
        plusBox.classList.remove('selected');
        minusBox.classList.remove('selected');
        multiplyBox.classList.remove('selected');
        divideBox.classList.remove('selected');
        // Right now if you selected minus then clear (but not AC) minus would still be highlighted. that right?
    }
    else {
        clearVars();
        clearDisplay();
        displayBox.textContent = display;
        allClear = true
        clearBox.textContent = "AC"
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

// FUNCTION THAT ADDS SELECTION TO DISPLAY
// need to change so that you don’t just edit a value after "=" is pressed but not sure how
// value needs to reset upon pressing…
// might need a toggle variable…
function addSelectionToDisplay(selection) {
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