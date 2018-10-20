// start by :
//npm install --save ethjs
//npm install --save ethjs-signer
// then run this file 


const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://ropsten.infura.io/bf65789eedeb42f886e4f383648d0324')); 
const sign = require('ethjs-signer').sign;
const async = require('async');

//const generate = require('ethjs-account')




function post(nasaRaw){

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

  var nasa=nasaRaw
  nasa.data=toHex(nasa.data)
function send(callback){
    
  var Tx1 = sign(nasa, nasa.secretKey)
  eth.sendRawTransaction(Tx1)
    .then((result) => {
      console.log("HAMDO LELAH: \n" + result)  
      callback()
    }).catch((error) => {
      console.log("DAMN IT: \n" + error)
    });
}

function getTransactionCount(callback){
  eth.getTransactionCount(nasa.address)
    .then((result) => {
      console.log("getTransactionCount: " + result.toString(10))
      nasa.nonce = result
      console.log(nasa.nonce)
      callback()
    })
    .catch((error) => {
      console.log("Eror with getTransactionCount: \n" + error)
    });
}

 
function estimateGas(callback){
  eth.estimateGas(nasa)
    .then((result) => {
      console.log("estimateGas: " + result.toString(10))
      nasa.gasLimit = result.toString(10)
      callback()
    })
    .catch((error) => { 
      console.log("Eror with estimateGas: \n" + error)
    });
}



async.series([
    estimateGas,
    getTransactionCount,
    send
     ]);

}

  



module.exports=post;