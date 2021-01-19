import React, {
  useState,
  useRef,
  useEffect
} from "react"
import axios from "axios"
import {
  useCart
} from "../../contexts/cartContext"

function Payement(props) {
  console.log(props.total)
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState(null)
  const [cart, dispatch] = useCart()
  const paypalRef = useRef()
  const mail =props.mail
  const expressPayment = props.expressPayment
  const address = props.address
  const onSuccess = async () => {
    // Envoyer la commande au server
    const order = cart.map((item) => ({
      id: item._id,
      count: item.count,
      name: item.name,
      description: item.description,
      price: item.price,
      curency: item.curency,
      photo: item.photo,
    }))
    await axios.post(
      "http://localhost:8080/cart",
      { order, mail, address },
      { withCredentials: true }
    )

    // Vider le cart
    dispatch({ type: "empty" })

    // Afficher un message
    alert("Payment effectué !")

  
  }
  // const price = this.props.price
  useEffect(() => {
    [...paypalRef.current.children].forEach((e) => (e.style.display= "none"))
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            // intent: "CAPTURE",
            purchase_units: [{
              description: "Payement",
              amount: {
                currency_code: "EUR",
                value: expressPayment ? props.total+10 : props.total,
              },
            }, ],
          })
        },
        onApprove: async (data, actions) => {
          console.log(data)
          // const order = await actions.order.capture()
          console.log(cart)
          axios.post("http://localhost:8080/payments/checkout_action", {
            "orderId": data.orderID,
            "cart": cart
          }, {
            withCredentials: true
          })
          .then((response) => {
            setPaid(true)
            console.log("resdata " + response.data.message);
          })
          .catch((response) => {
            console.log('pas de stock par exemple ou capture échouée', error)
           alert("stock indisponible pour un ou plusieurs produit veuillez en retirer puis ressayer")
          })
          console.log(cart)
        },
        onError: (err) => {
          //  setError(err),
          console.error('echec du paiement', err)
        },
      })
      .render(paypalRef.current)
  }, [props.total , expressPayment])
  if (paid) {
    onSuccess()
    
  }

  if (error) {
    return <div> Payement refuser merci de reessayer </div>
  }
  return <div ref = {
    paypalRef
  }
  />
}
export default Payement