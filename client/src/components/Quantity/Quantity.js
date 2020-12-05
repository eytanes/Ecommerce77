import React, { useState } from "react"
import styles from "./Quantity.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useCart } from "../../contexts/cartContext"

const Quantity = (props) => {
  const [number, setNumber] = useState(1)

  const [, dispatch] = useCart()

  const addToCart = () => {
    dispatch({
      type: "add",
      item: props.item,
      count: number,
    })
  }

  return (
    <>
      <div className={styles.bg}>
        <div
          className={styles.square}
          onClick={() => {
            if (number > 1) {
              setNumber(number - 1)
            }
          }}
        >
          -
        </div>

        <p className={styles.nombre}>{number}</p>
        <div
          className={styles.square}
          onClick={() => {
            setNumber(number + 1)
          }}
        >
          +
        </div>

        <h3 className={styles.total}> {number * props.price}€ </h3>
        <button className={styles.reset} onClick={() => setNumber(1)}>
          reinitialisé quantitée{" "}
        </button>
        <br />
        <button className={styles.addToCard} onClick={addToCart}>
          Ajouter au panier <FontAwesomeIcon icon={faShoppingCart} />
        </button>
       
      </div>
    </>
  )
}

export default Quantity
