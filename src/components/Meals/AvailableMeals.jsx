import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css'

import { Card } from '../UI/Card'
import { MealItem } from './MealItem/MealItem';

export function AvailableMeals() {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMeals() {
      const url = 'https://react-http-a333c-default-rtdb.firebaseio.com/meals.json'
      const response = await fetch(url)

      if (!response.ok) throw new Error('Something went wrong!')

      const data = await response.json()

      const loadedMeals = []

      for(const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }       

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading meals...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className={classes['meals-error']}>
        <p>{error}</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => (
    <MealItem key={meal.id} meal={meal} />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}