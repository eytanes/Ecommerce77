var express = require("express")
var router = express.Router()
var orderBy = require("../public/javascripts/sortData").orderBy

router.get("/:order", function (req, res, next) {
  const { order } = req.params
  orderBy(order, (result) => {
    res.send(result)
  })
})

module.exports = router
