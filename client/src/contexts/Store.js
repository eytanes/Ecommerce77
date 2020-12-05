import React from "react"

import { AuthProvider } from "./authContext"
import { CartProvider } from "./cartContext"

export default ({ children }) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
)
