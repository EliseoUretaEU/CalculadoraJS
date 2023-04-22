const calculo = {
    pantalla: '0',
    primeraoperacion: null,
    esperandosegundaoperacion: false,
    operador: null,
  };
  
  function inputDigit(digit) {
    const { pantalla: displayValue, esperandosegundaoperacion: waitingForSecondOperand } = calculo;
  
    if (waitingForSecondOperand === true) {
      calculo.pantalla = digit;
      calculo.esperandosegundaoperacion = false;
    } else {
      calculo.pantalla = displayValue === '0' ? digit : displayValue + digit;
    }
  }
  
  function inputDecimal(dot) {
    // If the `displayValue` does not contain a decimal point
    if (!calculo.pantalla.includes(dot)) {
      // Append the decimal point
      calculo.pantalla += dot;
    }
  }
  
  function handleOperator(nextOperator) {
    const { primeraoperacion: firstOperand, pantalla: displayValue, operador: operator } = calculo
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculo.esperandosegundaoperacion)  {
      calculo.operador = nextOperator;
      return;
    }
  
    if (firstOperand == null) {
      calculo.primeraoperacion = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculo.pantalla = String(result);
      calculo.primeraoperacion = result;
    }
  
    calculo.esperandosegundaoperacion = true;
    calculo.operador = nextOperator;
  }
  
  const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  function resetCalculator() {
    calculo.pantalla = '0';
    calculo.primeraoperacion = null;
    calculo.esperandosegundaoperacion = false;
    calculo.operador = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculo.pantalla;
  }
  
  updateDisplay();
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });