// Test script to verify WooCommerce API connection
const axios = require('axios');
require('dotenv').config();

const woocommerceUrl = process.env.WOOCOMMERCE_URL;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

console.log('Testing WooCommerce API Connection...\n');
console.log('Configuration:');
console.log(`URL: ${woocommerceUrl}`);
console.log(`Key: ${consumerKey.substring(0, 10)}...`);
console.log(`Secret: ${consumerSecret.substring(0, 10)}...\n`);

const authHeader = 'Basic ' + Buffer.from(
  `${consumerKey}:${consumerSecret}`
).toString('base64');

console.log('Making request to:', `${woocommerceUrl}/wp-json/wc/v3/products\n`);

axios.get(
  `${woocommerceUrl}/wp-json/wc/v3/products`,
  {
    headers: {
      'Authorization': authHeader
    }
  }
)
  .then(response => {
    console.log('✅ SUCCESS! API is reachable.\n');
    console.log(`Found ${response.data.length} products`);
    if (response.data.length > 0) {
      console.log('\nFirst product:');
      console.log(JSON.stringify(response.data[0], null, 2).substring(0, 500));
    }
  })
  .catch(error => {
    console.log('❌ FAILED! Error details:\n');
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Message: ${error.response.statusText}`);
      console.log('Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('Error:', error.message);
    }
  });
