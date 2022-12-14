import classes from './Card.module.css'

export function Card({ children }) {
  return (
    <div className={classes.card}>
      {children}
    </div>
  )
}