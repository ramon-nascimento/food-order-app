import { Fragment } from 'react'

import { MealsSummary } from './MealsSummary'
import { AvailableMeals } from './AvailableMeals'

export function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  )
}