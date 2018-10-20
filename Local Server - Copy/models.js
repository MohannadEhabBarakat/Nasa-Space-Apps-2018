var txSchema = new mongoose.Schema({
    to: String,
    address: String,
    gasPrice: String,
    secretKey: String,
    value: String,
    data: String 
  });
var tx = mongoose.model('txs', txSchema);

module.exports=tx;