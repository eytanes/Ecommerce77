import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../contexts/authContext"
import styles from "./suscription.module.css"
const Suscription = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [mail, setMail] = useState("")

  const [auth, dispatchAuth] = useAuth()
  const history = useHistory()
var [suscriptionComplete, setSuscriptionComplete] = useState(false)
   if (auth.loggedIn )
   {alert("Vous êtes  connecté")
      history.goBack() }
      //else if(suscriptionComplete===true){
    //    history.goBack()
    //    setSuscriptionComplete(false)
    //  }
  //&& (suscriptionComplete === false)) {
  //   alert("Vous êtes déjà connecté")
  //   history.goBack()
  // }else if(auth.loggedIn){
  //   history.goBack()
  // }

  var URLConnexion = "http://localhost:8080/connexion/suscription"
  const addUser = () => {
    let request = { userName: name, password: password, email: mail, address }
    axios
      .post(URLConnexion, request, { withCredentials: true })
      .then((resp) => {
        dispatchAuth({
          type: "login",
          admin: resp.data.isAdmin,
          loggedIn: true,
          email: resp.data.email,
          address: resp.data.address,
          name: resp.data.name,
        })
        history.push("/")
      })
      .catch(console.error)
setSuscriptionComplete(true)
  }

  return (<div className={styles.background}>
   
<div className={styles.suscription}>
<div className={styles.signupSection}>
  <div className={styles.info}>
    <h2 className={styles.title}>Inscription</h2>
    <i className={styles.icon} className= "ion-ios-ionic-outline" aria-hidden="true"></i>
    
  </div>
  <form  className={styles.signupForm} name="signupform">
    <h2>inscription</h2>
    <ul className={styles.noBullet}>
      <li>
        
        <input type="text" className={styles.inputFields} id="username" name="username" placeholder="Username" onChange={(e) => {
            setName(e.target.value)
          }} />
      </li>
      <li>
        
        <input type="password" className={styles.inputFields} id="password" name="password" placeholder="mot de passe" onChange={(e) => {
            setPassword(e.target.value)
          }} required/>
      </li>
      <li>
       
        <input type="email" className={styles.inputFields} id="email" name="email" placeholder="votre email" onChange={(e) => {
            setMail(e.target.value)
          }}  required/>
      </li>
      <li>
        
        <input type="text" className={styles.inputFields}  placeholder="Adresse complete" onChange={(e) => {
            setAddress(e.target.value)
          }}  required/>
      </li>
      <li id="center-btn">
      <button className={styles.joinbtn} onClick={addUser}>
          créer un compte
        </button>
      </li>
    </ul>
  </form>
</div>
</div>
</div>  )
}
export default Suscription
