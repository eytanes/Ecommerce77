import React from "react"
import styles from "./Card.module.css"
import { useAuth } from "../../contexts/authContext"

const Card = ({
  id,
  title,
  onZoom,
  description,
  photo,
  price,
  curency,
  logo,
  stock,
  onDelete,
}) => {
  const [auth] = useAuth()

  return (
    <div className={styles.card} onClick={onZoom}>
      {auth.admin && (
        <p className={styles.delete} onClick={onDelete}>
          X
        </p>
      )}
      <img src={photo} alt="maillot du" className={styles.photo} />
      <h5 className={styles.title}>{title}</h5>
      <h6>{description}</h6>
      {auth.admin && <p>Stock: {stock}</p>}
      <p className={styles.price}>
        {price}
        {curency}
      </p>
      <img src={logo} alt="" className={styles.logo} />
    </div>
  )
}

export default Card
