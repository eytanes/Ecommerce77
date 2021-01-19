function orderBy( order, callBack) {
 
    global.dbo.collection("products").find({ stock: { $gt: 0 } }).sort( { price: order === "ascending" ? 1 : -1} ).toArray(function (err, result) {
      if (err) throw err;
     
      
      return callBack(result)
    });
  
}
// function descendingOrder(callBack) {
//   MongoClient.connect(connectionURL, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db(databaseName);
//     dbo.collection("products").find().sort( { price: -1 } ).toArray(function (err, result) {
//       if (err) throw err;
     
//       db.close();
//       return callBack(result)
//     });
//   });
// }

module.exports= 
{ orderBy}