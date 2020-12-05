import React from "react"
import { Link } from "react-router-dom"
import ShoppingCart from "../ShoppingCart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFutbol } from "@fortawesome/free-solid-svg-icons"
import Connexion from "../connexion"

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-black">
        <Link className="navbar-brand text-light font-weight-bold" to="/">
          Go F<FontAwesomeIcon icon={faFutbol} />
          <FontAwesomeIcon icon={faFutbol} />t
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/register">
                Inscription
              </Link>
            </li>
          </ul>
          <Connexion />
          <ShoppingCart />
        </div>
      </nav>
    </>
  )
}

export default Header
