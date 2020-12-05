import React, { useState } from "react"
import axios from "axios"
import { useAuth } from "../../contexts/authContext"
var URLConnexion = "http://localhost:8080/connexion"

const Connexion = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [auth, dispatchAuth] = useAuth()

  const check = () => {
    let request = { userName: name, password: password }
    axios
      .post(URLConnexion, request, { withCredentials: true })
      .then((resp) => {
        dispatchAuth({
          type: "login",
          admin: resp.data.isAdmin,
          email: resp.data.email,
          address: resp.data.address,
        })
      })
      .catch(console.error)
  }

  const logout = () => {
    dispatchAuth({ type: "logout" })
  }
  if (!auth.loggedIn) {
    return (
      <div className="form-inline">
        <input
          className="form-control"
          placeholder="UserName"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button className="btn btn-primary" onClick={check}> 
          connexion
        </button>
      </div>
    )
  } else {
    return (
      <button onClick={logout} className="btn btn-secondary">
        se deconnecter
      </button>
    )
  }
}
export default Connexion
