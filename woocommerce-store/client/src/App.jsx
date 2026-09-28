import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch products from our Express backend when component loads
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      // Make request to Express backend
      const response = await fetch('http://localhost:5000/api/products')

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()

      // Handle empty product list
      if (Array.isArray(data) && data.length === 0) {
        setProducts([])
        setError('No products found')
        return
      }

      // Set products state
      setProducts(data)
      console.log(`✅ Loaded ${data.length} products`)

    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Failed to load products. Make sure the backend server is running.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1> Shit Shopping</h1>
        <p className="subtitle">Browse our collection of products</p>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>⏳ Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="error-container">
          <p className="error">⚠️ {error}</p>
          <button onClick={fetchProducts} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product Image */}
              <div className="product-image">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].src}
                    alt={product.name}
                    onError={(e) => {
                      console.log(`Image load failed: ${product.images[0].src}`)
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22280%22%3E%3Crect fill=%22%23e2e8f0%22 width=%22300%22 height=%22280%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22 font-size=%2216%22 font-family=%22Arial%22%3EImage Not Available%3C/text%3E%3C/svg%3E'
                    }}
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="no-image">📷 No Image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>

                {/* Price */}
                <p className="product-price">
                  ${parseFloat(product.price || 0).toFixed(2)}
                </p>

                {/* Short Description */}
                {product.short_description && (
                  <div className="product-description">
                    <p>{product.short_description.replace(/<[^>]*>/g, '')}</p>
                  </div>
                )}

                {/* View Product Button */}
                {product.permalink ? (
                  <a
                    href={product.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-btn"
                  >
                    🛍️ View Product
                  </a>
                ) : (
                  <button className="view-btn" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    No Link Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Products State */}
      {!loading && !error && products.length === 0 && (
        <div className="no-products">
          <p>🛒 No products available</p>
        </div>
      )}
    </div>
  )
}

export default App
