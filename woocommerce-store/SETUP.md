# Setup Instructions (Step-by-Step)

## What You Need Before Starting

1. ✅ Node.js and npm installed
2. ✅ Local WordPress with WooCommerce installed
3. ✅ WooCommerce API credentials (Consumer Key & Secret)

---

## Commands to Run

### Terminal 1: Start Backend Server

```bash
cd woocommerce-store/server
npm install
```

Then edit `.env` and add your WooCommerce credentials:

```env
WOOCOMMERCE_URL=http://localhost/wordpress
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxx
PORT=5000
```

Then run:

```bash
npm start
```

**Expected Output:**
```
Backend server running at http://localhost:5000
WooCommerce API endpoint: http://localhost/wordpress
```

### Terminal 2: Start Frontend Development Server

```bash
cd woocommerce-store/client
npm install
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

### Terminal 3: Open Browser

Visit **http://localhost:5173** and you should see:

- ✅ A header saying "WooCommerce Products"
- ✅ A grid of your WooCommerce products
- ✅ Each product showing image, name, price, and description
- ✅ "View Product" button on each card

---

## Verify Everything Works

### Check Backend is Running

Open browser and visit: **http://localhost:5000/api/health**

Expected response:
```json
{"status":"Backend server is running"}
```

### Check Backend Can Reach WooCommerce

Open browser and visit: **http://localhost:5000/api/products**

Expected response: JSON array of your WooCommerce products

If you see an error, check:
- ✅ WOOCOMMERCE_URL in `.env` is correct
- ✅ WOOCOMMERCE_CONSUMER_KEY is correct
- ✅ WOOCOMMERCE_CONSUMER_SECRET is correct
- ✅ WooCommerce REST API is enabled in WordPress

### Check Frontend Can Reach Backend

Open browser DevTools (F12) → Console tab

You should NOT see any errors. If you see CORS errors, make sure backend is running.

---

## Data Flow Visualization

When you load the page, here's exactly what happens:

```
Step 1: User visits http://localhost:5173
         ↓
Step 2: React component loads and calls fetchProducts()
         ↓
Step 3: React makes HTTP request to http://localhost:5000/api/products
         ↓
Step 4: Express backend receives request
         ↓
Step 5: Express reads .env file for credentials
         ↓
Step 6: Express creates authentication header
         ↓
Step 7: Express makes HTTPS request to WooCommerce API
         ↓
Step 8: WooCommerce API authenticates and returns products
         ↓
Step 9: Express receives product data and sends to React
         ↓
Step 10: React receives products and updates state
         ↓
Step 11: React renders products in grid
```

---

## Common Issues

### Issue: "Cannot GET /api/products"

**Solution:** Make sure backend is running in Terminal 1

### Issue: Products not showing but no error

**Solution:** 
1. Check browser console for errors (F12)
2. Check backend terminal for errors
3. Verify credentials in `.env`
4. Refresh browser

### Issue: "CORS error" in browser console

**Solution:** Make sure backend is running and CORS is enabled

### Issue: Backend won't start

**Solution:**
1. Make sure port 5000 is not in use
2. Check if `node_modules` folder exists
3. Try: `npm install` again
4. Restart the terminal

---

## How to Stop

To stop each server:

- **Backend**: Press `Ctrl + C` in Terminal 1
- **Frontend**: Press `Ctrl + C` in Terminal 2

---

## Next: Customize & Deploy

Once everything works:

1. **Customize styling**: Edit `client/src/App.css`
2. **Add more products**: Add more products to WooCommerce admin
3. **Deploy**: Refer to deployment guides for Express and Vite

---

## Need Help?

- Check console logs in browser (F12)
- Check backend terminal output
- Verify `.env` has correct credentials
- Make sure both servers are running on correct ports
