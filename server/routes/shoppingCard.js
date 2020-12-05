var express = require("express")
var router = express.Router()

router.get("/", function (req, res, next) {
  // ((result) => {
  //   res.send(result)
  // })
  res.send("hi")
})

router.post("/", function (req, res) {
  var name = req.body.name
  var addresse = req.body.adresse
  console.log(req.body)
  global.dbo
    .collection("commande")
    .insertOne({ name: name, addresse: addresse })
  // addOrders()
  // console.log(art)
  res.status(200).send({
    message: "ok ",
  })
})

// console.log(arr)
module.exports = router

// let we=req.body.name
// let address= req.body.address
//     var myobj = { name: we, address:address };
//     arr.insert(myobj)
//         console.log("1 document inserted");
//       res.status(200).send({message: "post ok"})
//       console.log(arr)
