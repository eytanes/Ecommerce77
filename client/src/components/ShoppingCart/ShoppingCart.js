import React, { useState, useEffect } from "react"
import styles from "./ShoppingCart.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import Paypal from "../Payment/Paypal"
import { useCart } from "../../contexts/cartContext"
import Axios from "axios"
import { useAuth } from "../../contexts/authContext"
import Payement from "../Payment"

const ShoppingCart = () => {
  const [cart, dispatch] = useCart()
  const [open, setOpen] = useState(false)

  const [auth] = useAuth()

  const [mail, setMail] = useState(auth.email)
  const [address, setAddress] = useState(auth.address)

  const [status, setStatus] = useState([])
  const [delivery, setDelivery]=useState("collissimo")
  // const [total, setTotal]= useState(cart.reduce((acc, item) => acc + item.count * item.price, 0))
  const remove = (_id) => {
    dispatch({
      type: "remove",
      _id,
    })
  }

  useEffect(() => {
    setMail(auth.email)
    setAddress(auth.address)
  }, [auth])

  useEffect(() => {
    if (cart.length === 0) setOpen(false)
    setStatus(cart.map((item) => ({ id: item._id, available: true })))
  }, [cart])

  useEffect(() => {
    if (open) {
      Axios.post("http://localhost:8080/cart/validate", cart, {
        withCredentials: true,
      })
        .then(() =>
          setStatus(status.map((s) => ({ id: s.id, available: true })))
        )
        .catch((err) => {
          const items = err.response.data.items.map((item) => item.id)
          console.log(items)

          setStatus(
            status.map((s) =>
              items.includes(s.id)
                ? { id: s.id, available: false }
                : { id: s.id, available: true }
            )
          )
        })
    }
  }, [open])

  // const onSuccess = async () => {
  //   // Envoyer la commande au server
  //   const order = cart.map((item) => ({
  //     id: item._id,
  //     count: item.count,
  //     name: item.name,
  //     description: item.description,
  //     price: item.price,
  //     curency: item.curency,
  //     photo: item.photo,
  //   }))
  //   await Axios.post(
  //     "http://localhost:8080/cart",
  //     { order, mail, address },
  //     { withCredentials: true }
  //   )

  //   // Vider le cart
  //   dispatch({ type: "empty" })

  //   // Afficher un message
  //   alert("Payment effectué !")

  
  // }

  var total = cart.reduce((acc, item) => acc + item.count * item.price, 0)
  if (delivery== "express"){
    total+= 10
  }

  if (open === true && cart.length > 0) {
    return (
      <>
        <div className={styles.cart}>
          <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
          <div className={styles.numberOfItems}>
            <div className="alignMiddle">{cart.length}</div>
          </div>
        </div>
        <div className={styles.panier}>
          <div onClick={() => setOpen(false)} className={styles.close}>
            X
          </div>
          {cart.map((item) => (
            <div className={styles.item}>
              <h3 className={styles.title}>
                {item.name} {item.description}
              </h3>
              <img src={item.photo} alt="" className={styles.photo} />
              <div className={styles.details}>
                <strong>
                  Prix: {item.price} {item.curency}
                  <br />
                  quantite: {item.count}
                  <br />
                  {!status.find((s) => s.id === item._id).available && (
                    <h2 style={{ color: "red" }}> en rupture de stock</h2>
                  )}
                  Total: {item.price * item.count} {item.curency}
                 
                </strong>
              </div>
              <div
                onClick={() => {
                  if (cart.length === 1) setOpen(false)
                  
                  remove(item._id)
                  return(<div>blalalls
                  {status.every((s) => s.available) && (
                    // <Paypal onSuccess={onSuccess} toPay={total} /> l'autre payement est mieux
                    <Payement total={total} mail={mail} address={address}/>
                  )}</div>)

                }}
                className={styles.removeItem}
              >
                X
              </div>
            </div>
          ))}
        </div>

        <div className={styles.form}>
          <input
            className={styles.input}
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="votre mail"
          />
          <br />
          <input
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="votre adresse"
          />
          <div className={styles.delivery}>
        <p>Methode de livraison:</p>

<div>
<input type="radio" onInput={()=>{setDelivery("collissimo")}}
     name="livraison"  />
    <label >colissimo</label>
    
    <br/>

    <input type="radio"  onInput={()=>{setDelivery("express")}}
     name="livraison"  />
    <label >express (livrer en 24h) cout:10€</label>
    
<br/>
    <input type="radio"  onInput={()=>{setDelivery("point relais")}}
     name="livraison"  />
    <label >Point Relais</label>
    
    </div>
    <p>{delivery}</p>
     </div>
          <p>Total: {total} €</p>
          {status.every((s) => s.available) && (
            // <Paypal onSuccess={onSuccess} toPay={total} /> l'autre payement est mieux
            <Payement total={total} mail={mail} address={address}/>
          )}
          
        </div>
         </>
    ) 
    
  } else {
    return (
      <div
        className={styles.cart}
        onClick={() => {
          if (cart.length > 0) setOpen(true)
        }}
      >
        <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
        <div className={styles.numberOfItems}>{cart.length}</div>
      </div>
    )
  }
}
export default ShoppingCart
