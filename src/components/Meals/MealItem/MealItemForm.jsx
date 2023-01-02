import { useRef, useState } from 'react'

import classes from './MealItemForm.module.css'

import { Input } from '../../UI/Input'

export function MealItemForm({ id, onAddToCart }) {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()

  function submitHandler(event) {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 || 
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return
    }

    onAddToCart(enteredAmountNumber)
  }

  const inputConfig = {
    id: `amount_${id}`,
    type: 'number',
    defaultValue: '1',
    min: '1', max: '5', step: '1',
  }
  
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount' 
        input={inputConfig}
      />

      <button type="submit">
        + Add
      </button>

      {!amountIsValid && <p>Please, enter a valid amount (1-2).</p>}
    </form>
  )
}