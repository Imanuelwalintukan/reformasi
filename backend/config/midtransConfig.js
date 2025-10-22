const midtransClient = require('midtrans-client');

// Initialize Midtrans client
let midtransCoreApi = new midtransClient.CoreApi({
  isProduction: false, // Set to false for sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

let midtransSnap = new midtransClient.Snap({
  isProduction: false, // Set to false for sandbox
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

module.exports = {
  midtransCoreApi,
  midtransSnap
};