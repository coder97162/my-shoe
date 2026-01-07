import axios from 'axios'

const products = [
  // --- ROW 1 (Working) ---
  { 
    id: 1, 
    name: 'Nike Air Max 270', 
    price: 12000, 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 2, 
    name: 'Adidas Ultraboost', 
    price: 15500, 
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 3, 
    name: 'Air Jordan 1 High', 
    price: 18000, 
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80' 
  },
  
  // --- ROW 2 (Working) ---
  { 
    id: 4, 
    name: 'Puma RS-X', 
    price: 8500, 
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 5, 
    name: 'New Balance 574', 
    price: 9000, 
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 6, 
    name: 'Vans Old Skool', 
    price: 4500, 
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80' 
  },

  // --- ROW 3 (FIXED LINKS) ---
  { 
    id: 7, 
    name: 'Converse Chuck 70', 
    price: 5500, 
    // New working High-top image
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 8, 
    name: 'Nike Air Force 1', 
    price: 9500, 
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 9, 
    name: 'Vans Checkerboard Slip-On', 
    price: 4500, 
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80' 
  },

  // --- ROW 4 (FIXED LINKS) ---
  { 
    id: 10, 
    name: 'Reebok Club C', 
    price: 6000, 
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 11, 
    name: 'Adidas Superstar', 
    price: 7500, 
    // New working White Sneaker image
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80' 
  },
  { 
    id: 12, 
    name: 'Nike Dunk Low Retro', 
    price: 13500, 
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80' 
  }
]

function Home() {

  const handleBuyNow = async (product) => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      alert('Please login to place an order')
      return
    }

    try {
      const productId = product.id || product.ProductID
      await axios.post(
        'http://localhost:5000/api/orders/place-order',
        { ProductID: productId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      alert('Order placed successfully!')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  return (
    <div className="products-page">
      <h1 className="products-title">All Shoes</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-wrapper">
              <img className="product-image" src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              <button
                className="buy-button"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home

