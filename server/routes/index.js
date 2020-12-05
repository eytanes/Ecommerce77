var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var getProducts = require('../public/javascripts/dataFromDb').getProducts

/* GET home page. */
router.get('/', (req, res, next) => {

  getProducts((result) => {
    res.send(result)
  })
  
});

module.exports = router;