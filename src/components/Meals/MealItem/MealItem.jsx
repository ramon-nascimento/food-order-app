import { useContext } from 'react'

import classes from './MealItem.module.css'

import CartContext from '../../../store/cart-context'
import { MealItemForm } from './MealItemForm'

export function MealItem({ meal }) {
  const cartCtx = useContext(CartContext)

  const price = `$${meal.price.toFixed(2)}`

  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      amount,
    })
  }

  return (
    <li className={classes.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div>
        <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}