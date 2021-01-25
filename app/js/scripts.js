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
    if (event.key === '+') {
        select('+');
    }
    if (event.key === '-') {
        select('-');
    }
    if (event.key === '*') {
        select('*')
    }
    if (event.keyCode === '/') {
        select('/')
    }
    if (event.key === '=') {
        selectEquals();
    }
    if (event.key === 'Enter') {
        selectEquals();
    }
})

// EVENT LISTENERS AND FUNCTIONS FOR OPERATION BUTTONS
// Idea is to also make these highlight the chosen button (like iOS)
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

function select(funcoperator) {
    if (!memory[0] || memory[memory.length-1].pressed === '=') {
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




    // if (memory[0]) {
    //     // if you’re calculating based on something that itself was succesfully calculated with operate()
    //     if (memory[memory.length-1].result !== undefined) {
    //         storeVars(memory[memory.length-1].result, memory[memory.length-1].pressed, display, funcoperator);
    //         display = memory[memory.length-1].result;
    //     }
    //     // if you just entered the first thing
    //     else if (memory[memory.length-1].pressed !== '=') {
    //         storeVars(memory[memory.length-1].operandx, memory[memory.length-1].pressed, display, funcoperator)
    //         display = memory[memory.length-1].result
    //     }
    //     // if you just evaluated something with =
    //     else {
    //         storeVars(display,undefined,undefined,funcoperator)
    //     }
    // }
    // // if you’re putting in the first thing    
    // else {
    //     storeVars(display,undefined,undefined, opclicked)
    // }
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
    if(memory[0]) {
        if (memory[memory.length-1].pressed === '=') {
            for (i = memory.length-1; i >= 0; i--) {
                if (memory[i].pressed !== '=') {
                    storeVars(
                        memory[memory.length-1].result,
                        memory[i].pressed,
                        // this is all jacked up… used to take it at i…
                        memory[memory.length-1].operandy,
                        operate(memory[i].pressed, memory[memory.length-1].result, memory[i].operandy),
                        '='
                    );
                    break
                }
            }
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
        displayBox.textContent = display;
    }




    // if (memory[0]) {
    //     if (memory[memory.length-1].pressed !== '=') {
    //         if (memory[memory.length-1].result !== undefined) {
    //             storeVars(memory[memory.length-1].result, memory[memory.length-1].pressed, display, '=')
    //         }
    //         else {
    //             storeVars(memory[memory.length-1].operandx, memory[memory.length-1].pressed, display, '=')
    //         }
    //     }
    //     else {
    //         for (i = memory.length-1; i >= 0; i--) {
    //             if (memory[i].pressed !== "=") {
    //                 storeVars(memory[memory.length-1].result, memory[i].pressed, memory[memory.length-1].operandy, '=')
    //                 break
    //             }
    //         }
    //     }
    //     display = memory[memory.length-1].result;
    //     displayBox.textContent = display;
    // }
    // what happens if i…
    // firstDigitOperating = 1;
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
// need to change so that you don’t just edit a value after "=" is pressed but not sure how
// value needs to reset upon pressing…
// might need a toggle variable…
function addSelectionToDisplay(selection) {
    if (firstDigitOperating) {
        clearDisplay();
        firstDigitOperating = 0;
        // if (memory[0]) {
        //     if (memory[memory.length-1].pressed = "=") {
        //         // im not sure this works because selectEquals() never stores whats on the display (which makes sense…)
        //         // but if I made it do that in specific instances, it would essentially be the same functionality as pressing “clear”
        //         // but not all clear
        //         // note: clear but not all clear on the apple mac calc stores the display and the operator that’s it. So when you press equals again
        //         // you’re technically doing a brand new operation…
        //         // look again, it works weird!
                

        //         // THIS BROKE EVERYTHIGN!
        //         storeVars(undefined, memory[memory.length-1].operator, memory[memory.length-1].operandy, '=')
        //     }
        // }
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