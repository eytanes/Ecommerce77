var mailSend = require("../public/javascripts/mailSending").sendOrderEmail
var express = require("express")
const ObjectId = require("mongodb").ObjectId
var router = express.Router()

router.post("/validate", async (req, res) => {
  const cart = req.body

  const ids = cart.map((item) => ObjectId(item._id))

  const products = await global.dbo
    .collection("products")
    .find({
      _id: { $in: ids },
    })
    .toArray()

  const outOfStock = cart
    .map((item) => ({ ...item, _id: ObjectId(item._id) }))
    .filter(
      (item) => item.count > products.find((p) => p._id.equals(item._id)).stock
    )
    .map((item) => ({
      id: item._id,
      difference: products.find((p) => p._id.equals(item._id)).stock,
    }))

  if (outOfStock.length > 0) {
    return res.status(400).json({
      message: "Some items are out of stock",
      items: outOfStock,
    })
  }

  return res.status(200).json(cart.map((p) => p.name))
})

router.post("/validate/:id", async (req, res) => {
  const { id } = req.params
  const { quantity } = req.body

  const products = global.dbo
    .collection("products")
    .find({ _id: ObjectId(id) })
    .toArray()

  if (products.length === 0)
    return res.status(404).json({ message: "No product with this id" })

  const product = products[0]

  if (quantity > product.stock)
    return res
      .status(400)
      .json({ message: "Out of stock", stock: product.stock })

  return res.status(200).end()
})

router.post("/", async (req, res) => {
  const { order, mail, address } = req.body

  const result = await global.dbo.collection("orders").insert({
    mail,
    address,
    items: order.map((o) => ({ ...o, id: ObjectId(o.id) })),
  })

  await Promise.all(
    order.map((o) =>
      global.dbo
        .collection("products")
        .update({ _id: ObjectId(o.id) }, { $inc: { stock: o.count * -1 } })
    )
  )
  console.log("mail", mail)
  mailSend(mail, order)

  return res.status(201).json(result)
})

module.exports = router
