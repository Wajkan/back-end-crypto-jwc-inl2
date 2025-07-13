import { useState } from 'react'

function MineTransactions() {
  const [mining, setMining] = useState(false)
  const [lastMined, setLastMined] = useState(null)

  const handleMining = async () => {
    try {
      setMining(true)
      
      // Replace with your actual endpoint
      // const response = await fetch('/api/mine', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
      // const data = await response.json()
      
      console.log('Starting mining process...')
      
      // Mock mining delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock response
      const mockResult = {
        blockHash: '00000abc123def456...',
        transactions: 3,
        reward: 6.25,
        timestamp: new Date().toISOString()
      }
      
      setLastMined(mockResult)
      alert('Mining successful! Block mined.')
      
    } catch (error) {
      console.error('Error mining:', error)
      alert('Mining failed')
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
        
        {lastMined && (
          <div className="mining-result">
            <h4>Last Mining Result:</h4>
            <p><strong>Block Hash:</strong> {lastMined.blockHash}</p>
            <p><strong>Transactions:</strong> {lastMined.transactions}</p>
            <p><strong>Reward:</strong> {lastMined.reward} BTC</p>
            <p><strong>Time:</strong> {new Date(lastMined.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MineTransactions