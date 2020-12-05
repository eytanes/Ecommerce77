const express = require("express")
const crud = require("../public/javascripts/adminCrud")
const listProductsAdmin = crud.listProductsAdmin

var router = express.Router()
router.get("/", (req, res) => {
  if (req.session.isAdmin === undefined || req.session.isAdmin === false) {
    return res.status(403).send({ message: "Pas autorisé" })
  }

  listProductsAdmin((result) => {
    res.send(result)
  })
})
router.get("/orders", (req, res) => {
  // if (req.session.isAdmin === undefined || req.session.isAdmin === false) {
  //   return res.status(403).send({ message: "Pas autorisé" })
  // }

  crud.orders((result) => {
    res.send(result)
    // console.log(result)
  })
})
router.post("/", function (req, res) {
  const sess = req.session
  if (!sess || sess.isAdmin === false) {
    return res.status(403).send("Pas autorisé")
  }

  const {
    nom,
    description,
    prix,
    curency,
    stock,
    marque,
    categorie,
    logo,
    image,
  } = req.body

  crud.createProduct(
    nom,
    description,
    parseInt(prix),
    curency,
    parseInt(stock),
    marque,
    categorie,
    logo,
    image
  )
  res.status(200).send("ok")
})

router.post("/:id", function (req, res) {
  const sess = req.session
  if (!sess || sess.isAdmin === false) {
    return res.status(403).send("Pas autorisé")
  }

  const {
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo,
  } = req.body
  crud.updateProduct(
    req.params.id,
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo
  )
  res.status(200).send({
    id: req.params.id,
  })
})

router.delete("/:id", function (req, res) {
  const sess = req.session
  if (!sess || sess.isAdmin === false) {
    return res.status(403).send("Pas autorisé")
  }

  crud.deleteProduct(req.params.id)
  res.status(200).send()
})

module.exports = router
