import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const hasToken = Boolean(localStorage.getItem('token'))
    setIsAuthenticated(hasToken)

    const handleStorage = (e) => {
      if (e.key === 'token') {
        setIsAuthenticated(Boolean(e.newValue))
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/" className="navbar__link">ShoeSite</Link>
      </div>
      <div className="navbar__items">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="navbar__link">Login</Link>
            <Link to="/register" className="navbar__link navbar__link--primary">Register</Link>
          </>
        ) : (
          <button className="navbar__button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar




