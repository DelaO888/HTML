

class Calculator{

    constructor(lastEl, currentEl){
        this.lastEl = lastEl
        this.currentEl = currentEl
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.lastOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    compute(){
        let resul
        const prev = parseFloat(this.lastOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){

            case '+':
                resul = prev + current
                break
            case '/':
                resul = prev / current
                break
            case '-':
                resul = prev - current
                break
            case '*':
                resul = prev * current
                break
             default:
                 return  
        }
            this.currentOperand = resul
            this.operation = undefined
            this.lastOperand = ''
    }


    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.lastOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.lastOperand = this.currentOperand
        this.currentOperand = ''
    }

  getDisplayNumber(number){
      const stringNum = number.toString()
      const intNum = parseFloat(stringNum.split('.')[0])
      const decNum = stringNum.split('.')[1]
      let intDisp
      if(isNaN(intNum)){
          intDisp = ''
      } else {
          intDisp = intNum.toLocaleString('en', {maximumFractionDigits: 0})
      }
      if(decNum != null){
          return `${intDisp}.${decNum}`
      } else {
          return intDisp
      }
  }


    updateDisplay(){
        this.currentEl.innerText = this.getDisplayNumber(this.currentOperand)
        this.lastEl.innerText = this.lastOperand
        if(this.operation != null){
            this.lastEl.innerText = `${this.lastOperand} ${this.operation}`
        } else {
            this.lastEl.innerText = ''
        }
    }
}



const numbers = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const del = document.querySelector('[data-del]')
const clear = document.querySelector('[data-clear]')
const currentEl = document.querySelector('[data-currentElement]')
const lastEl = document.querySelector('[data-lastElement]')


const calculator = new Calculator(lastEl,currentEl)

numbers.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operation.forEach(button => {
    button.addEventListener('click',() => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

del.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

clear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})