import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './NikeAuth.css'

function Login() {
  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-image-side"></div>
      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-logo">ShoeSite</div>
          <h1>Login</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                className="auth-input"
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="auth-button" type="submit">Login</button>
          </form>
          <div className="auth-meta">
            New here? <Link className="auth-link" to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login


