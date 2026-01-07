import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './NikeAuth.css'

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
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
      await axios.post('http://localhost:5000/api/auth/register', formData)
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-image-side"></div>
      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-logo">ShoeSite</div>
          <h1>Register</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label">Name</label>
              <input
                className="auth-input"
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
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
            <button className="auth-button" type="submit">Register</button>
          </form>
          <div className="auth-meta">
            Already have an account? <Link className="auth-link" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register


