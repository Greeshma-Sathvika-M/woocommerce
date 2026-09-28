// Backend server to securely fetch WooCommerce products
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create axios instance with SSL disabled for localhost (self-signed cert)
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Enable CORS for React frontend running on localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// GET /api/products - Fetch products from WooCommerce
app.get('/api/products', async (req, res) => {
  try {
    const woocommerceUrl = process.env.WOOCOMMERCE_URL;
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

    // Validate configuration
    if (!woocommerceUrl || !consumerKey || !consumerSecret) {
      return res.status(500).json({
        error: 'WooCommerce credentials not configured in .env file'
      });
    }

    console.log('📦 Fetching products from WooCommerce...');

    // Fetch from WooCommerce using query string authentication
    const response = await axiosInstance.get(
      `${woocommerceUrl}/wp-json/wc/v3/products?per_page=100&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        }
      }
    );

    console.log(`✅ Found ${response.data.length} products`);

    // Send products to React frontend
    res.json(response.data);

  } catch (error) {
    console.error('❌ Error fetching from WooCommerce:', error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Unauthorized - Check your WooCommerce credentials in .env'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch products from WooCommerce',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running at http://localhost:${PORT}`);
  console.log(`🔗 WooCommerce API: ${process.env.WOOCOMMERCE_URL}`);
  console.log(`✅ Ready to fetch products!\n`);
});
