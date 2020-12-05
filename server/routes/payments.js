const express = require('express')
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')
const ObjectId = require('mongodb').ObjectID

let clientId = "AZucxtHg72AqV00moDR4Q4eJoZOcsZOMe2RS5NUIY50QNB47M4K9v-mjJ63SKSbAYPpYrYqdz6dt9ehE";
let clientSecret = "EHO-lJ53lnnnKPN3hBzehH8GC41yQ0FD7JOoezkerdXpzw1-Ss04kbb8gMebh-XpoowdtWprJ7QhYaZs";
let environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
let client = new checkoutNodeJssdk.core.PayPalHttpClient(environment)

const router = express.Router()

router.post('/checkout_action', async (req, res) => {

  const orderID = req.body.orderId;
  const cart = req.body.cart;
  let outOfStock = 0
  // console.log(orderID)

  // vérifier le stock
  // si y'a pas de stock renoyer un 500 qui sera catché par axios
  // cart.forEach(element => {
  //   console.log(element.count)
  // });
  for (var i = 0; i < cart.length; i++) {
    // console.log('count', cart[i].count)
    // console.log('cart', cart[i])
    // console.log('product', await global.dbo.collection('products').findOne({
    //   _id: ObjectId(cart[i]._id)
    // }))
    // global.dbo.collection('products').findOne({
    //   _id: cart[i]._id
    // }, (err, res) => {
    //   console.log(res, err)
    // })
    const inStockProduct = await global.dbo.collection("products").findOne({
      _id: ObjectId(cart[i]._id),
      stock: {
        $gt: ((cart[i].count)-1)
      }
    })
    console.log('in stock ?', inStockProduct)
    
    if (!inStockProduct) {
      outOfStock += 1
    }
  }
  //console.log(await global.dbo.collection("products").findOne({ _id:cart[i-1]._id, stock:{ $gt: cart[i-1].count }}))
  console.log("taille " + cart.length)
  //console.log("i" + i)
  console.log("pa en stock " + outOfStock)

  if (outOfStock === 0) {
    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
      const authorization = await client.execute(request);
      console.log(authorization)
      // 4. Save the authorization ID to your database
      // const authorizationID = authorization.result.purchase_units[0]
      //   .payments.authorizations[0].id
      // console.log(authorizationID)
      // await database.saveAuthorizationID(authorizationID);

    } catch (err) {

      // 5. Handle any errors from the call
      console.error(err);
      return res.send(500);
    }

    // 6. Return a successful response to the client
    res.status(200).send({
      message: "ok ",
      
    });
  } else {
    console.log("toto")
    return res.status(500)
  }
})
module.exports = router