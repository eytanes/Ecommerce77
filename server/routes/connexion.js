const bcrypt = require("bcrypt")
var express = require("express")
var router = express.Router()

var getUsers = require("../public/javascripts/found").getUser
router.get("/", function (req, res, next) {
  // ((result) => {
  //   res.send(result)
  // })
  res.send("hi")
})
router.get("/me", (req, res) => {
  const sess = req.sess
  if (!sess || sess.isAdmin === false) {
    res.status(403)
  }
  if (sess.email) {
    userData = getUser(sess.email)
    res.send(userData)
  }
})
router.post("/", function (req, res) {
  // sess.email = req.body.email
  // sess.isAdmin = true

  // const user = sess.email
  // if sess.user.admin === true
  // sess.destroy()
  getUsers((users) => {
    let result = users.find((pro) => pro.userName === req.body.userName)
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        req.session.username = req.body.userName
        req.session.address = result.address
        req.session.isAdmin = result.isAdmin
        req.session.email = result.email
        console.log("connection", req.session)
        res.status(200).send({
          message: "ok ",
          isAdmin: result.isAdmin,
          address: result.address,
          email: result.email,
        })
      } else {
        res.status(400).send({
          message: "incorect password",
        })
      }
    } else {
      res.status(404).send({
        message: "user not found",
      })
    }
  })
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid", { path: "/" })
  })
  //res.status(200).send();
})

router.post("/suscription", (req, res) => {
  const username = req.body.userName
  const email = req.body.email
  const password = req.body.password

  const address = req.body.address

  // vérfier si l'email est valide
  // check if exist email
  // si l'user exist alors erreur (on ne peux pas s'inscire avec un mail qui existe déjà)
  //sinon  insert db
  const users = global.dbo.collection("users")
  users.findOne(
    {$or:[{
      email: email},{userName: username}
    ]},
    function (err, result) {
      if (err) throw err

      if (!result) {
        bcrypt.hash(password, 10, (err, encrypted) => {
          users.insertOne({
            userName: username,
            address: address,
            email: email,
            password: encrypted,
            isAdmin: false,
          })
          const sess = req.session
          sess.email = email
          sess.address = address
          sess.userName = username
          sess.isAdmin = false
          res.status(200).send({
            status: "ok",
            email: email,
            address: address,
            isAdmin: false,
            name: username,
          })
        })
      } else {
        res.status(404)
      }
      console.log("po" + result)
    }
  )
})

module.exports = router
