'use strict';

const Signer = require('signer')
const Config = require('./config.json')

let contractAddress = Config.contractAddress
let wallet = Config.wallet

module.exports.sign = (event, context, callback) => {

  // {
  //   "data": "0x9ef1204c22fff861f9169f9bcd816662549........0000000000000000000000000000000000000000000000000000000000000000",
  //   "gasPrice": "0x4A817C800",
  //   "nonce": "0x0f",
  //   "to": "0x9560eaacba2........c302e071ebb03b"
  // }
  let rawTx = event.body
  console.log("contractAddress", contractAddress)

  if (rawTx === undefined || rawTx === {}) {
    return callback("rawTx is undefined or empty")
  }
  if (rawTx.to == undefined) {
    rawTx = JSON.parse(rawTx)
  }

  console.log("rawTx", rawTx)

  try {
    let signedTx = Signer(rawTx, {
      "contractAddress": contractAddress,
      "wallet": wallet
    })

    const response = {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
      body: JSON.stringify({
        signedTx: signedTx,
      }),
    }
    callback(null, response)
  }
  catch(error) {
    console.log("error", error)
    let errorMessage = error.message !== undefined ? error.message : error
    const response = {
      statusCode: 400,
      headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
      body: JSON.stringify({
        "error": errorMessage,
      }),
    }
    callback(null, response)
    // callback(error)
  }

}
