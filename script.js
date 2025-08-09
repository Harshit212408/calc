class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
        this.addEventListeners();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    percentage() {
        this.currentOperand = parseFloat(this.currentOperand) / 100;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }

    addEventListeners() {
        // Button click events
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
                this.animateButton(button);
            });
        });

        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.animateButton(button);
                
                switch (action) {
                    case 'clear':
                        this.clear();
                        break;
                    case 'delete':
                        this.delete();
                        break;
                    case 'equals':
                        this.compute();
                        break;
                    case 'percent':
                        this.percentage();
                        break;
                    default:
                        this.chooseOperation(action);
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                const button = document.querySelector(`[data-number="${e.key}"]`);
                if (button) {
                    this.appendNumber(e.key);
                    this.animateButton(button);
                }
            } else if (e.key === '.') {
                const button = document.querySelector('[data-number="."]');
                if (button) {
                    this.appendNumber('.');
                    this.animateButton(button);
                }
            } else if (e.key === '+') {
                const button = document.querySelector('[data-action="add"]');
                if (button) {
                    this.chooseOperation('+');
                    this.animateButton(button);
                }
            } else if (e.key === '-') {
                const button = document.querySelector('[data-action="subtract"]');
                if (button) {
                    this.chooseOperation('-');
                    this.animateButton(button);
                }
            } else if (e.key === '*') {
                const button = document.querySelector('[data-action="multiply"]');
                if (button) {
                    this.chooseOperation('×');
                    this.animateButton(button);
                }
            } else if (e.key === '/') {
                const button = document.querySelector('[data-action="divide"]');
                if (button) {
                    this.chooseOperation('/');
                    this.animateButton(button);
                }
            } else if (e.key === '%') {
                const button = document.querySelector('[data-action="percent"]');
                if (button) {
                    this.percentage();
                    this.animateButton(button);
                }
            } else if (e.key === 'Enter' || e.key === '=') {
                const button = document.querySelector('[data-action="equals"]');
                if (button) {
                    this.compute();
                    this.animateButton(button);
                }
            } else if (e.key === 'Escape') {
                this.clear();
            } else if (e.key === 'Backspace') {
                this.delete();
            }
        });
    }

    animateButton(button) {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 150);
    }
}

// Initialize calculator
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandElement, currentOperandElement);