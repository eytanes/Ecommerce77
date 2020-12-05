const dotenv = require("dotenv")
dotenv.config()

var express = require("express")
var createError = require("http-errors")
var path = require("path")
var logger = require("morgan")
var cors = require("cors")
var bodyParser = require("body-parser")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var categoriesRouter = require("./routes/categories")
var shoppingCardRouter = require("./routes/shoppingCard")
var cartRouter = require("./routes/cart")
var orderRouter = require("./routes/order")
var connexionRouter = require("./routes/connexion")
var adminRouter = require("./routes/admin")
var paymentsRouter = require("./routes/payments")
require("./public/javascripts/database.js")

var app = express()
// view engine setup
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "jade")
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
// app.use(logger("dev"))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
})
//app.use(cookieParser())
app.use(
  session({
    secret: "test",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false
    },
    store: new MongoStore({
      url: 'mongodb://127.0.0.1:27017',
      autoRemove: 'native'
    })
  })
)

app.use(express.json())

app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use(express.static(path.join(__dirname, "public")))

// app.use((req, res, next) => {
//   if (req.cookies.user_sid) {
//     res.clearCookie('connect.sid');
//   }
//   next();
// })

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/categories", categoriesRouter)
app.use("/order", orderRouter)
app.use("/connexion", connexionRouter)
app.use("/shoppingCard", shoppingCardRouter)
app.use("/cart", cartRouter)
app.use("/admin", adminRouter)
app.use("/payments", paymentsRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app