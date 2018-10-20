var Web3 = require('web3');
var nasa = require('./nasa')




function getAll(){
  //x=nasa.address;
  
var n = web3.eth.blocknumber;

var txs = [];
for(var i = 0; i < n; i++) {
    var block = web3.eth.getBlock(i, true);
    for(var j = 0; j < block.transactions; j++) {
        if( block.transactions[j].to == nasa.address )
            txs.push(block.transactions[j]);
            console.log("Transactions", txs[i])

      
    }
}  
            console.log("Transactions", txs[0])

}

getAll();


