# WooCommerce Product Store

A beginner-friendly full-stack application that demonstrates how to connect a React frontend to a local WordPress WooCommerce REST API securely.

## 📋 Project Overview

This project builds a simple product store that:
- ✅ Fetches products from your local WooCommerce store
- ✅ Displays them in a clean, responsive grid
- ✅ Keeps WooCommerce credentials secure on the backend
- ✅ Uses Express.js as a secure proxy between React and WooCommerce
- ✅ Shows loading, error, and empty states

## 🏗️ Architecture

```
React Frontend (localhost:5173)
          ↓
Express Backend (localhost:5000)
          ↓
WooCommerce REST API
          ↓
WordPress + WooCommerce Database
```

## 📁 Project Structure

```
woocommerce-store/
│
├── server/                    # Backend Express server
│   ├── server.js              # Main Express app with /api/products endpoint
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (credentials go here)
│
└── client/                    # React frontend
    ├── src/
    │   ├── App.jsx            # Main React component
    │   ├── main.jsx           # React entry point
    │   └── App.css            # Styling
    ├── index.html             # HTML template
    ├── package.json           # Frontend dependencies
    └── vite.config.js         # Vite configuration
```

## 🔐 Security

The WooCommerce Consumer Key and Consumer Secret are stored **only** in the backend `.env` file and never exposed to the frontend:

- Backend (`server/.env`): Contains actual credentials
- Frontend: Only communicates with backend API
- Result: Credentials are safe from exposure in browser

## 🚀 Quick Start

### Prerequisites

- Node.js and npm installed
- A local WordPress installation with WooCommerce plugin
- WooCommerce REST API credentials (Consumer Key and Secret)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure .env File

Edit `server/.env` and add your WooCommerce credentials:

```env
WOOCOMMERCE_URL=http://localhost/wordpress
WOOCOMMERCE_CONSUMER_KEY=your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=your_consumer_secret_here
PORT=5000
```

To get credentials from WooCommerce:
1. Log in to WordPress admin
2. Go to WooCommerce → Settings → Advanced → REST API
3. Create an API key
4. Copy the Consumer Key and Consumer Secret

### Step 3: Start Backend Server

```bash
# From the server directory
npm start
```

You should see:
```
Backend server running at http://localhost:5000
WooCommerce API endpoint: http://localhost/wordpress
```

### Step 4: Install Frontend Dependencies

In a new terminal:

```bash
cd client
npm install
```

### Step 5: Start Frontend Development Server

```bash
# From the client directory
npm run dev
```

You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Step 6: Open in Browser

Visit **http://localhost:5173** in your browser and you should see your WooCommerce products displayed!

## 📊 Complete Request Flow

Here's what happens when you load the page:

```
1. Browser loads http://localhost:5173
   ↓
2. React App component mounts
   ↓
3. useEffect calls fetchProducts()
   ↓
4. React fetches from http://localhost:5000/api/products
   ↓
5. Express backend receives request
   ↓
6. Express reads credentials from .env file
   ↓
7. Express creates Basic Auth header with Consumer Key:Secret
   ↓
8. Express calls WooCommerce at http://localhost/wordpress/wp-json/wc/v3/products
   ↓
9. WooCommerce API validates credentials and returns product data
   ↓
10. Express returns products to React frontend
    ↓
11. React displays products in a grid
```

## 🎨 Features

- **Responsive Grid Layout**: Adapts to mobile, tablet, and desktop
- **Product Cards**: Display image, name, price, and description
- **Loading State**: Shows message while fetching products
- **Error Handling**: Shows error messages and retry button
- **Empty State**: Shows "No products found" when appropriate
- **View Product Button**: Links to product on WooCommerce store

## 📝 Code Explanations

### Backend: How Credentials Are Used

File: `server/server.js`

```javascript
// Read credentials from .env (secure, not in frontend)
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

// Create Basic Auth header
const authHeader = 'Basic ' + Buffer.from(
  `${consumerKey}:${consumerSecret}`
).toString('base64');

// Call WooCommerce with authentication
const response = await axios.get(
  `${woocommerceUrl}/wp-json/wc/v3/products`,
  { headers: { 'Authorization': authHeader } }
);
```

### Frontend: Fetching Products

File: `client/src/App.jsx`

```javascript
// Fetch from backend (not directly from WooCommerce)
const response = await fetch('http://localhost:5000/api/products')
const data = await response.json()

// Display products in React state
setProducts(data)
```

## 🔧 Troubleshooting

### "Failed to fetch products" Error

1. Make sure both servers are running:
   - Backend: `http://localhost:5000` (terminal shows startup message)
   - Frontend: `http://localhost:5173` (browser shows app)

2. Check `.env` file has correct credentials:
   - Verify WOOCOMMERCE_URL matches your WordPress path
   - Verify WOOCOMMERCE_CONSUMER_KEY and WOOCOMMERCE_CONSUMER_SECRET are correct

3. Test backend directly:
   - Open browser and visit: `http://localhost:5000/api/products`
   - You should see JSON product data
   - If not, check backend console for errors

### CORS Error

Make sure the Express backend is running with CORS enabled. It should allow requests from `http://localhost:5173`.

### Credentials Not Working

1. Verify credentials in WooCommerce REST API settings
2. Make sure API key has "Read" permissions
3. Restart backend server after updating `.env`

## 📚 Learning Resources

- [WooCommerce REST API Documentation](https://woocommerce.com/document/woocommerce-rest-api/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## ✨ Next Steps (Not Included)

This is a beginner project. To extend it, you could add:
- Add to cart functionality
- Shopping cart page
- Product detail page
- Search and filtering
- User authentication
- Order history
- Database for storing user data

But these are **not** included to keep the project simple and focused on the core concept.

## 📄 License

This project is open source and available for learning purposes.
