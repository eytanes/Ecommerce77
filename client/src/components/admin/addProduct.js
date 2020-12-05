import React, { useState } from "react"
import styles from "../suscription/suscription.module.css"
import Axios from "axios"

const AddProduct = ({ close ,addingProduct , setAddProduct }) => {
  const [formData, setFormData] = useState({
    categorie: "",
    nom: "",
    description: "",
    prix: "",
    marque: "",
    image: "",
    logo: "",
    stock: 0,
  })
   const [open ,setOpen]=useState(true)

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  const addProduct = () => {
    if (!Object.keys(formData).every((key) => formData[key].length > 0)) {
      alert("Veuillez remplir tous les champs")
      return
    }

    if (formData.stock < 0 || formData.prix < 0) {
      alert("Le prix et le stock doivent être positifs")
      return
    }

    formData.curency = "€"

    Axios.post("http://localhost:8080/admin", formData, {
      withCredentials: true,
    })
  }
if (open){
  return (
    <>
    {/* <div className={styles.form}>
      <p onClick={close}>X</p>
      <input
        placeholder="categorie"
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="nom"
        name="nom"
        value={formData.nom}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="marque"
        name="marque"
        value={formData.marque}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="logo"
        name="logo"
        value={formData.logo}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="prix"
        name="prix"
        value={formData.prix}
        onChange={handleChange}
      />
      €<br />
      <input
        placeholder="lien image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />
      <br />
      <input
        placeholder="stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
      />
      <button onClick={addProduct}>Ajouter</button>
    </div> */}
    <div className={styles.background}>
  
<div className={styles.suscription}>
<div className={styles.addProductSection}>
  <div className={styles.info}>
    <h2 className={styles.title}>ajout Produit</h2>
    <i className={styles.icon} className= "ion-ios-ionic-outline" aria-hidden="true"></i>
    
  </div>
  <form  className={styles.signupForm} name="signupform">
    <h2>detail du produit</h2>
    <ul className={styles.noBullet}>
      <li>
        
        <input type="text" className={styles.inputFields}  placeholder="categorie"
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
           />
      </li>
      <li>
        
        <input  className={styles.inputFields} placeholder="nom"
        name="nom"
        value={formData.nom}
        onChange={handleChange}/>
      </li>
      <li>
       
        <input  className={styles.inputFields} 
        placeholder="description"
        name="description"
        value={formData.description}
        onChange={handleChange}/>
      </li>
      <li>
        
        <input type="text" 
        className={styles.inputFields}  
        placeholder="marque"
        name="marque"
        value={formData.marque}
        onChange={handleChange}/>
      </li>
      <li>
      <input
      className = {styles.inputFields}
        placeholder="logo"
        name="logo"
        value={formData.logo}
        onChange={handleChange}
      />
      </li>
      <li>
      <input
       className={styles.inputFields} 
        placeholder="prix"
        name="prix"
        value={formData.prix}
        onChange={handleChange}
      />
      €
      </li>
      <li>
      <input
       className={styles.inputFields} 
        placeholder="lien image"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />
      </li>
      <li>
      <input
       className={styles.inputFields} 
        placeholder="stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
      />
      </li>
      
      <li id="center-btn">
      <button className={styles.joinbtn} onClick={addProduct}>
          ajouter produit
        </button>
      </li>
    </ul>
  </form>
</div>
</div>
</div>  
 <br/>
 <br/>
 <div className={styles.space}></div>
    </>
  )}else return <div></div> 
}
export default AddProduct
