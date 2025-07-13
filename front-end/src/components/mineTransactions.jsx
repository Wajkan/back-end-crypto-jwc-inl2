import { useState } from 'react'

function MineTransactions() {
  const [mining, setMining] = useState(false)
  const [lastMined, setLastMined] = useState(null)
  const [error, setError] = useState(null)

  const handleMining = async () => {
    try {
      setMining(true)
      setError(null)
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setError('No authentication token found')
        return
      }
      
      const response = await fetch('http://localhost:3000/api/v1/wallet/transactions/mine', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Successful mining
        const miningResult = {
          blockHash: data.data.blockHash,
          message: data.data.message,
          timestamp: new Date().toISOString()
        }
        
        setLastMined(miningResult)
        console.log('Mining successful:', data)
        
      } else {
        // Handle different types of failures
        if (data.statusCode === 400 && data.message === "No transactions to mine") {
          setError('No transactions available to mine in the pool')
        } else {
          setError(data.message || 'Mining failed')
        }
      }
      
    } catch (error) {
      console.error('Error mining:', error)
      setError('Network error: Could not connect to mining endpoint')
    } finally {
      setMining(false)
    }
  }

  return (
    <div className="component-card">
      <h3>Mine Transactions</h3>
      <div className="mining-section">
        <button 
          onClick={handleMining} 
          disabled={mining}
          className={`mine-btn ${mining ? 'mining' : ''}`}
        >
          {mining ? 'Mining...' : 'Start Mining'}
        </button>
        
        {error && (
          <div className="mining-error">
            <p>⚠️ {error}</p>
          </div>
        )}
        
        {lastMined && (
          <div className="mining-result">
            <h4>🎉 Mining Successful!</h4>
            <p><strong>Message:</strong> {lastMined.message}</p>
            <p><strong>Block Hash:</strong></p>
            <div className="full-hash">{lastMined.blockHash}</div>
            <p><strong>Mined at:</strong> {new Date(lastMined.timestamp).toLocaleString()}</p>
          </div>
        )}
        
        <div className="mining-info">
          <p><strong>How mining works:</strong></p>
          <ul>
            <li>Collects pending transactions from the pool</li>
            <li>Creates a new block with proof-of-work</li>
            <li>Adds the block to the blockchain</li>
            <li>Rewards the miner with cryptocurrency</li>
          </ul>
          <p><em>Note: Mining requires pending transactions in the pool</em></p>
        </div>
      </div>
    </div>
  )
}

export default MineTransactions