import { useState } from 'react';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import ChainExplorer from './pages/chainexplorer';

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'login', 'register', 'explorer'

  const handleLoginSuccess = () => {
    setCurrentView('explorer')
  }

  const handleLogout = () => {
    setCurrentView('home')
  }

  if (currentView === 'login') {
    return (
      <Login 
        onBack={() => setCurrentView('home')} 
        onLoginSuccess={handleLoginSuccess}
      />
    )
  }

  if (currentView === 'register') {
    return <Register onBack={() => setCurrentView('home')} />
  }

  if (currentView === 'explorer') {
    return <ChainExplorer onLogout={handleLogout} />
  }

  // Home view
  return (
    <div className="home-container">
      <h1>Welcome to BLOCKCHAIN</h1>
      <div className="auth-buttons">
        <button onClick={() => setCurrentView('login')} className="auth-btn">
          Login
        </button>
        <button onClick={() => setCurrentView('register')} className="auth-btn">
          Register
        </button>
      </div>
    </div>
  )
}

export default App