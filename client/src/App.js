import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import "./App.css"
import Header from "./components/Header"
import CardList from "./components/CardList"
import "tachyons"

import Store from "./contexts/Store"
import Suscription from "./components/suscription/suscription"

function App() {
  return (
    <div className="App">
      
      <Store>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/register" component={Suscription} exact />
            <Route path="/" component={CardList} exact />
          </Switch>
        </BrowserRouter>
      </Store>
    </div>
  )
}

export default App
