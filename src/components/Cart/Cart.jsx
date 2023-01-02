import React, { useContext, useState } from 'react'

import classes from './Cart.module.css'
import CartContext from '../../store/cart-context'

import { Modal } from '../UI/Modal'
import { CartItem } from './CartItem'
import { Checkout } from './Checkout'

export function Cart({ onClose }) {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  function cartItemRemoveHandler(id) {
    cartCtx.removeItem(id)
  }

  function cartItemAddHandler(item) {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  function orderHandler() {
    setIsCheckout(true)
  }

  async function submitOrderHandler(userData) {
    setIsSubmitting(true)

    await fetch('https://react-http-a333c-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    })

    setIsSubmitting(false)
    setDidSubmit(true)

    cartCtx.clearCart()
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={onClose}>
        Close
      </button>
      
      {hasItems && (
        <button className={classes.button} onClick={orderHandler} >Order</button>
      )}
    </div>
  )

  const cartModalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  )

  return (
    <Modal onClose={onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}