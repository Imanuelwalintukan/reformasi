// Midtrans configuration
const midtransConfig = {
  clientKey: process.env.REACT_APP_MIDTRANS_CLIENT_KEY || 'Mid-client-o7lFKhedQ-2GDdx0', // Default to sandbox client key
  isProduction: false, // Set to false for sandbox environment
  base_url: process.env.REACT_APP_MIDTRANS_BASE_URL || 'https://app.sandbox.midtrans.com/snap/v1'
};

export default midtransConfig;