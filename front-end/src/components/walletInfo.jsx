import { useState, useEffect } from 'react'

function WalletInfo() {
  const [walletData, setWalletData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWalletInfo = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setError('No authentication token found')
        return
      }
      
      const response = await fetch('http://localhost:3000/api/v1/wallet/info', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      
      if (data.success && data.data) {
        setWalletData(data.data)
      } else {
        setError('Failed to fetch wallet info: ' + (data.message || 'Unknown error'))
      }
      
    } catch (error) {
      console.error('Error fetching wallet info:', error)
      setError('Network error: Could not fetch wallet info')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWalletInfo()
  }, [])

  if (loading) return <div className="component-card">Loading wallet info...</div>

  if (error) {
    return (
      <div className="component-card">
        <h3>Wallet Information</h3>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchWalletInfo} className="refresh-btn">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="component-card">
      <h3>Wallet Information</h3>
      {walletData ? (
        <div className="wallet-info">
          <p><strong>Address:</strong></p>
          <p className="wallet-address">{walletData.address}</p>
          <p><strong>Balance:</strong> {walletData.balance} BTC</p>
          <button onClick={fetchWalletInfo} className="refresh-btn">
            Refresh
          </button>
        </div>
      ) : (
        <p>No wallet data available</p>
      )}
    </div>
  )
}

export default WalletInfo