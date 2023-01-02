import { useReducer } from "react"

import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0
}

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
    
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )

    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }

      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )

    const existingCartItem = state.items[existingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - existingCartItem.price

    let updatedItems

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1}
      
      updatedItems = [ ...state.items ]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

export function CartProvider({ children  }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  function addItemToCartHandler(item) {
    dispatchCartAction({ type: 'ADD', item })
  }

  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: 'REMOVE', id })
  }

  function clearCartHandler() {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}