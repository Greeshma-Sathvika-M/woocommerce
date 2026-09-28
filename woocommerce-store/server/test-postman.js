// Test the same way Postman would
const axios = require('axios');
require('dotenv').config();

const wooUrl = process.env.WOOCOMMERCE_URL;
const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

console.log('\n📋 Testing with your current credentials...\n');

// Method 1: Basic Auth (what Express uses)
console.log('Method 1: Basic Auth');
const basicAuth = 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64');

axios.get(`${wooUrl}/wp-json/wc/v3/products?per_page=1`, {
  headers: { 'Authorization': basicAuth }
})
.then(() => console.log('✅ Basic Auth works!\n'))
.catch(e => console.log(`❌ Basic Auth failed: ${e.response?.status}\n`));

// Method 2: Query string (alternative)
setTimeout(() => {
  console.log('Method 2: Query String (consumer_key & consumer_secret)');
  axios.get(`${wooUrl}/wp-json/wc/v3/products?per_page=1&consumer_key=${key}&consumer_secret=${secret}`)
  .then(() => console.log('✅ Query String works!\n'))
  .catch(e => console.log(`❌ Query String failed: ${e.response?.status}\n`));
}, 500);
