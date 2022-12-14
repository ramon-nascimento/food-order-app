import { Fragment } from 'react'

import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'

import { HeaderCartButton } from './HeaderCartButton'

export function Header({ onShowCart }) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>

        <HeaderCartButton onClick={onShowCart} />
      </header>

      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </Fragment>
  )
}