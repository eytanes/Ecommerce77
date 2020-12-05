function addOrder(callBack) {
    var myobj = { name: "Company Inc", address: "Highway 37" };
    global.dbo.collection("commande").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
     
      
      return callBack(result)
    });
}

  
module.exports = {
  addOrder
}