import React, { createContext, useContext, useReducer } from "react"

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

const authReducer = (state, action) => {
  let newState

  switch (action.type) {
    case "login":
      newState = {
        admin: action.admin,
        loggedIn: true,
        email: action.email,
        address: action.address,
        name: action.name,
      }
      break
    case "logout":
      newState = {
        admin: false,
        loggedIn: false,
        email: "",
        address: "",
        name: "",
      }
      break
    default:
      throw new Error("Unsupported action type")
  }

  localStorage.setItem("authState", JSON.stringify(newState))
  return newState
}

export const AuthProvider = ({ children }) => {
  const init =
    localStorage.getItem("authState") === null
      ? {
          admin: false,
          loggedIn: false,
          email: "",
          address: "",
          name: "",
        }
      : JSON.parse(localStorage.getItem("authState"))

  const [state, dispatch] = useReducer(authReducer, init)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

// Utilise le cart dans un composant
export const useAuth = () => {
  const state = useContext(AuthStateContext)
  const dispatch = useContext(AuthDispatchContext)

  if (state === undefined || dispatch === undefined)
    throw new Error("You need a AuthProvider to call useAuth")

  return [state, dispatch]
}
