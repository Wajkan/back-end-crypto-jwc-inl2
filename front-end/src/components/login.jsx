import { useState } from 'react'

function Login({ onBack, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loggingIn, setLoggingIn] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields')
      return
    }

    try {
      setLoggingIn(true)
      
      const response = await fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (data.success && data.data.token) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.data.token)
        
        console.log('Login successful, token stored')
        alert('Login successful!')
        
        // Call the success callback to navigate to ChainExplorer
        onLoginSuccess()
      } else {
        alert('Login failed: ' + (data.message || 'Invalid credentials'))
      }
      
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please check your connection and try again.')
    } finally {
      setLoggingIn(false)
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button onClick={onBack} className="back-btn">
        Back to Home
      </button>
    </div>
  )
}

export default Login