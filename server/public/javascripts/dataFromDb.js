function getProducts(callBack) {
 
    global.dbo.collection("products").find({ stock: { $gt: 0 } }).toArray(function (err, result) {
      if (err) throw err;
      

      return callBack(result)
    
    })}


module.exports = {
  getProducts
}