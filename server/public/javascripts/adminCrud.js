const ObjectId = require('mongodb').ObjectId

function createProduct(
  name,
  description,
  price,
  curency,
  stock,
  marque,
  categorie,
  logo,
  photo
) {
  global.dbo.collection("products").insert({
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo,
  })
}

function listProductsAdmin(callBack) {
  global.dbo
    .collection("products")
    .find()
    .toArray(function (err, result) {
      if (err) throw err
      return callBack(result)
    })
}
function orders(callBack) {
  global.dbo
    .collection("orders")
    .find()
    .toArray(function (err, result) {
      if (err) throw err
      return callBack(result)
    })
}

function updateProduct(
  id,
  name,
  description,
  price,
  curency,
  stock,
  marque,
  categorie,
  logo,
  photo
) {
  global.dbo.collection("products").updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $set: {
        name,
        description,
        price,
        curency,
        stock,
        marque,
        categorie,
        logo,
        photo,
      },
    }
  )
}

function deleteProduct(id) {
  global.dbo.collection("products").remove({
    _id: ObjectId(id),
  })
}

module.exports = {
  createProduct,
  listProductsAdmin,
  updateProduct,
  deleteProduct,
  orders,
}
