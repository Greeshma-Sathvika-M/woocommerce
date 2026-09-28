// Complete diagnostic - test API and see what products look like
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const wooUrl = process.env.WOOCOMMERCE_URL;
const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// Create axios with SSL disabled
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

console.log('\n🔍 FULL WOOCOMMERCE DIAGNOSTIC\n');
console.log('Configuration:');
console.log(`  URL: ${wooUrl}`);
console.log(`  Key: ${key.substring(0, 10)}...`);
console.log(`  Secret: ${secret.substring(0, 10)}...\n`);

// Test with query string
console.log('Testing with Query String method...\n');

axiosInstance.get(
  `${wooUrl}/wp-json/wc/v3/products?per_page=5&consumer_key=${key}&consumer_secret=${secret}`,
  {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json'
    }
  }
)
.then(response => {
  console.log(`✅ SUCCESS! Found ${response.data.length} products\n`);

  if (response.data.length > 0) {
    const product = response.data[0];
    console.log('First Product Details:');
    console.log(`  ID: ${product.id}`);
    console.log(`  Name: ${product.name}`);
    console.log(`  Price: ${product.price}`);
    console.log(`  Images: ${product.images ? product.images.length : 0} image(s)`);

    if (product.images && product.images.length > 0) {
      console.log(`  First Image URL: ${product.images[0].src}`);

      // Test if image URL is accessible
      console.log('\n  Testing image URL accessibility...');
      axios.head(product.images[0].src, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      })
      .then(() => console.log('  ✅ Image URL is accessible'))
      .catch(e => console.log(`  ❌ Image URL not accessible: ${e.message}`));
    } else {
      console.log(`  ⚠️  No images for this product`);
    }

    console.log(`\n  Description: ${product.short_description || 'None'}`);
    console.log(`  Permalink: ${product.permalink}`);
  }
})
.catch(error => {
  console.log(`❌ FAILED!`);
  console.log(`Status: ${error.response?.status}`);
  console.log(`Message: ${error.response?.statusText}`);
  console.log(`Error: ${error.message}`);
  if (error.response?.data) {
    console.log('Details:', JSON.stringify(error.response.data, null, 2));
  }
});
