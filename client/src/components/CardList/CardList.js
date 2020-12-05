import React, { useState, useEffect } from "react"
import Axios from "axios"

import styles from "./CardList.module.css"
import Card from "../Card"
import AddProduct from "../admin"
import {
  allProduct,
  soccerBall,
  allShirts,
  ascending,
  descendingOrder,
  allProductAdmin,
  orders,
} from "../../data/produit"
import BigCard from "../BigCard"
import Search from "../../components/Search"
import { useAuth } from "../../contexts/authContext"

var getProduit
const CardList = () => {
  const [zoomId, setZoomId] = useState(null)
  const [display, setDisplay] = useState("menu")
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState("")
  const [updater, setUpdater] = useState(Date.now())

  const [auth] = useAuth()
  const [addProduct, setAddProduct] = useState(false)
  switch (display) {
    case "menu":
      if (
        window.localStorage.admin === undefined ||
        JSON.parse(window.localStorage.admin) !== true
      ) {
        getProduit = allProduct
      } else {
        getProduit = allProductAdmin
        // setAdmin(true)
      }
      break
    case "ball":
      getProduit = soccerBall
      break
    case "ascending": {
      getProduit = ascending
      break
    }
    case "descending": {
      getProduit = descendingOrder
      break
    }
    case "shirts":
      getProduit = allShirts
      break
    case "admin":
      getProduit = allProductAdmin
      break
    default:
      getProduit = allProduct
  }
  
  useEffect(() => {
    getProduit().then(setProducts)
     orders().then()
  }, [display, addProduct, updater])

  const handleDelete = ({ _id, name, description }) => (e) => {
    e.stopPropagation()

    if (
      window.confirm(
        `Êtes vous sur de vouloir retirer ${name} ${description} ?`
      )
    ) {
      Axios.delete(`http://localhost:8080/admin/${_id}`, {
        withCredentials: true,
      }).then(() => setUpdater(Date.now()))
    }
  }

  const handleStock = (item) => () => {
    if (!auth.loggedIn || !auth.admin) return
    const value = prompt("Enter a new stock", item.stock)

    if (value !== null) {
      Axios.post(
        `http://localhost:8080/admin/${item._id}`,
        { ...item, stock: parseInt(value) },
        { withCredentials: true }
      ).then(() => setUpdater(Date.now()))
    }
  }

  const handlePrice = (item) => () => {
    if (!auth.loggedIn || !auth.admin) return
    const value = prompt("Enter a new price", item.price)

    if (value !== null) {
      Axios.post(
        `http://localhost:8080/admin/${item._id}`,
        { ...item, price: parseInt(value) },
        { withCredentials: true }
      ).then(() => setUpdater(Date.now()))
    }
  }

  if (zoomId !== null) {
    const element = products.filter((produit) => produit._id === zoomId)[0]

   if(element ){ return (
      <BigCard
        item={element}
        key={element._id}
        onClose={() => setZoomId(null)}
        name={element.name}
        photo={element.photo}
        title={element.name}
        description={element.description}
        price={element.price}
        curency={element.curency}
        isPromo={element.isPromo}
        newPrice={element.newPrice}
        logo={element.logo}
        stock={element.stock}
        handleStock={handleStock(element)}
        handlePrice={handlePrice(element)}
      />
    )}else{
      return(<BigCard 
        name =" vous avez supprimer le stock de ce produit veuillez aller dans la categories admin afin de voir les details de ce produit ou le modifier"
        onClose={() => setZoomId(null)}
        description= ""
        stock = "0"
        price= "0"
        />)
    }
  }

  return (
    <>
    {console.log(orders)}
      {addProduct && <AddProduct addProduct={addProduct} setAddProduct={setAddProduct} close={() => setAddProduct(false)} />}
     {addProduct== true ? <div className = {styles.closeAdd} onClick={()=>{setAddProduct(false)}}>X</div>:1==1}
      <Search
        filter={filter}
        setFilter={(e) => {
          setFilter(e.target.value)
          if (display !== "menu") setDisplay("menu")
        }}
      />
      <button onClick={() => setDisplay("ball")} className={styles.categories}>
        Ballon
      </button>
      <button
        onClick={() => setDisplay("shirts")}
        className={styles.categories}
      >
        Maillot
      </button>
      <button onClick={() => setDisplay("menu")} className={styles.categories}>
        Menu
      </button>
      <button
        onClick={() => setDisplay("ascending")}
        className={styles.categories}
      >
        croissant
      </button>
      <button
        onClick={() => setDisplay("descending")}
        className={styles.categories}
      >
        decroissant
      </button>
      {
        <button
          onClick={() => setDisplay("admin")}
          className={auth.admin ? styles.categories : styles.noDisplay}
        >
          admin
        </button>
      }

      <div className={styles.cardlist}>
        {products
          .filter(
            (element) =>
              element.name.toLowerCase().includes(filter.toLowerCase()) ||
              element.marque.toLowerCase().includes(filter.toLowerCase())
          )
          .map((element) => {
            return (
              <Card
                key={element.id}
                id={element._id}
                onZoom={() => setZoomId(element._id)}
                photo={element.photo}
                title={element.name}
                marque={element.marque}
                description={element.description}
                price={element.price}
                curency={element.curency}
                isPromo={element.isPromo}
                newPrice={element.newPrice}
                logo={element.logo}
                stock={element.stock}
                onDelete={handleDelete(element)}
              />
            )
          })}
      </div>

      {auth.admin && (
        <button
          className={styles["fab-add"]}
          onClick={() => setAddProduct(true)}
        >
          <p>+</p>
        </button>
      )}
    </>
  )
}

export default CardList
