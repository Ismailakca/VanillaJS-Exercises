const display = document.querySelector('.calculator__input');
const keys = document.querySelector('.calculator__keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitinfForSecondValue = false;

updateDisplay()

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click', (e) => {
    const element  = e.target;
    const value = element.value

    if (!element.matches('button')) return;

    switch (element.value){
        case '+' :
        case '-' :
        case '*' :
        case '/' :
        case '=' :
            handleOperator(value)
            break;
        case ',':
            inputDecimal()
            break;
        case 'clear':
            clear();
            break;
        default :
            inputNumber(element.value);
    }
    updateDisplay();

});

function inputNumber(number){
    if (waitinfForSecondValue === true){
        displayValue = number;
        waitinfForSecondValue = false;
    }
    else{
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
}

function inputDecimal(){
    if (!displayValue.includes('.')){
         displayValue += '.'
    }
}

function clear(){
    displayValue = '0';
}

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if (operator && waitinfForSecondValue){
        operator = nextOperator;
        return;
    }
    if (firstValue === null){
        firstValue = displayValue;
    }
    else if(operator){
        const result = calculate(firstValue,value,operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }
    waitinfForSecondValue = true;
    operator = nextOperator;
}

function calculate(first,second,operator){
    if (operator === '+'){
        return first + second
    }
    else if (operator === '-'){
        return first - second
    }
    else if(operator === '*'){
        return first * second
    }
    else if (operator === '/'){
        return  first / second
    }

    return second;
}