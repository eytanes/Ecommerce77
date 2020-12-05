
var MongoClient = require('mongodb').MongoClient;
var connectionURL = 'mongodb://127.0.0.1:27017'

// var dbo =   (callBack) => {
//      MongoClient.connect(connectionURL, (err, db) => {
//         if (err) throw err
//         callBack(db)
//         db.close()
//     })
// }

// module.exports = dbo
MongoClient.connect(connectionURL, function (err, db) {
    if (err) throw err;
    global.dbo = db.db('projet_Ecommerce');
  });
  