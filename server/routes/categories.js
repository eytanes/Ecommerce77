var express = require("express")
var router = express.Router()
var getByCategory = require("../public/javascripts/dataByCategories")
  .getByCategory

router.get("/:category", function (req, res, next) {
  const { category } = req.params
  getByCategory(category, (result) => {
    res.send(result)
  })
})

module.exports = router
