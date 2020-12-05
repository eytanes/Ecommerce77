function getUser(callBack) {
  
    global.dbo.collection("users").find().toArray(function (err, result) {
      if (err) throw err;
      //console.log(result);
     
      
      return callBack(result)
    });
}
function stock(callBack){
  global.dbo.collection("products").find().toArray(function (err, resultat) {
    if (err) throw err;
    //console.log(result);
   
    
    return callBack(resultat)
  });
}

   
module.exports = {
  getUser , stock
}