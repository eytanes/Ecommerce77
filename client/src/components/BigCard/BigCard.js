import React from "react"
import Quantity from "../Quantity"

import { useAuth } from "../../contexts/authContext"

import styles from "./BigCard.module.css"

const BigCard = ({
  photo,
  name,
  description,
  price,
  curency,
  logo,
  item,
  onClose,
  stock,
  handleStock,
  handlePrice,
}) => {
  const [auth] = useAuth()

  return (
    <div className={styles}>
      <div onClick={onClose} className={styles.close}>
        X
      </div>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} alt="" />
        <img className={styles.image} src={photo} alt="" />
      </div>
      <h1 className={styles.title}>{name + " " + description}</h1>
      {auth.admin && <p onClick={handleStock}>Stock: {stock}</p>}
      <div className={styles.price} onClick={handlePrice}>
        {" "}
        prix unitaire: {price}
        {curency}
      </div>

      <Quantity
        item={item}
        price={price}
        curency={curency}
        name={name}
        description={description}
      />
    </div>
  )
}

export default BigCard
