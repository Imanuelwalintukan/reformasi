// Midtrans configuration
const midtransConfig = {
  clientKey: process.env.REACT_APP_MIDTRANS_CLIENT_KEY,
  isProduction: false, // Set to false for sandbox environment
  base_url: process.env.REACT_APP_MIDTRANS_BASE_URL || 'https://app.sandbox.midtrans.com/snap/v1'
};

export default midtransConfig;