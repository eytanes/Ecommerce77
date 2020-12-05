import React, { createContext, useContext, useReducer } from "react"

const CartStateContext = createContext()
const CartDispatchContext = createContext()
// Retourne le nouveau state basé sur le state précédent et l'action à effectuer
const cartReducer = (state, action) => {
  let newState

  switch (action.type) {
    // action: { item: Item, count: Number }
    case "add":
      if (state.some((item) => item._id === action.item._id))
        newState = state.map((item) =>
          item._id === action.item._id
            ? { ...item, count: item.count + action.count }
            : item
        )
      else newState = [...state, { ...action.item, count: action.count }]
      break
    // action : { id: ID }
    case "remove":
      newState = state.filter((item) => item._id !== action._id)
      break
    case "empty":
      newState = []
      break
    default:
      throw new Error("Unsupported action type")
  }

  localStorage.setItem("cartState", JSON.stringify(newState))
  return newState
}

// Rend le cart accessible aux composants enfants
export const CartProvider = ({ children }) => {
  const init =
    localStorage.getItem("cartState") === null
      ? []
      : JSON.parse(localStorage.getItem("cartState"))

  const [state, dispatch] = useReducer(cartReducer, init)

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

// Utilise le cart dans un composant
export const useCart = () => {
  const state = useContext(CartStateContext)
  const dispatch = useContext(CartDispatchContext)

  if (state === undefined || dispatch === undefined)
    throw new Error("You need a CartProvider to call useCart")

  return [state, dispatch]
}
