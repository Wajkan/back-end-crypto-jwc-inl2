import { useState, useEffect } from 'react'

function BlockchainData() {
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBlockchainData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:3000/api/v1/blocks')
      const data = await response.json()
      
      if (data.success && data.data) {
        // Sort blocks by blockIndex in descending order (newest first)
        const sortedBlocks = data.data.sort((a, b) => b.blockIndex - a.blockIndex)
        setBlocks(sortedBlocks)
      } else {
        setError('Failed to fetch blockchain data')
      }
      
    } catch (error) {
      console.error('Error fetching blockchain data:', error)
      setError('Network error: Could not fetch blockchain data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlockchainData()
  }, [])

  const formatTimestamp = (timestamp) => {
    if (timestamp === 1) return 'Genesis'
    return new Date(timestamp).toLocaleString()
  }

  if (loading) return <div className="component-card">Loading blockchain data...</div>

  if (error) {
    return (
      <div className="component-card">
        <h3>Blockchain Data</h3>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={fetchBlockchainData} className="refresh-btn">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="component-card">
      <h3>Blockchain Data</h3>
      <button onClick={fetchBlockchainData} className="refresh-btn">
        Refresh Blocks
      </button>
      
      <div className="blocks-list">
        {blocks.map((block) => (
          <div key={block.blockIndex} className="block-item">
            <div className="block-header">
              <h4>Block #{block.blockIndex}</h4>
              <span className="difficulty-badge">Difficulty: {block.difficulty}</span>
            </div>
            
            <div className="block-details">
              <p><strong>Hash:</strong></p>
              <div className="full-hash">{block.hash}</div>
              
              <p><strong>Previous Hash:</strong></p>
              <div className="full-hash">{block.lastHash}</div>
              
              <p><strong>Timestamp:</strong> {formatTimestamp(block.timestamp)}</p>
              <p><strong>Nonce:</strong> {block.nonce}</p>
              <p><strong>Transactions:</strong> {block.data.length}</p>
            </div>

            {block.data.length > 0 && (
              <div className="transactions">
                <h5>Transactions:</h5>
                {block.data.map((transaction, index) => (
                  <div key={transaction.id} className="transaction-item">
                    <p><strong>Transaction ID:</strong></p>
                    <div className="full-hash">{transaction.id}</div>
                    
                    {transaction.input.address === '#reward-address' ? (
                      <p className="reward-tx">⭐ Mining Reward Transaction</p>
                    ) : (
                      <div className="transaction-details">
                        <p><strong>From Address:</strong></p>
                        <div className="full-hash">{transaction.input.address}</div>
                        
                        <p><strong>Amount:</strong> {transaction.input.amount}</p>
                        <p><strong>Timestamp:</strong> {new Date(transaction.input.timestamp).toLocaleString()}</p>
                        
                        <div className="signature-section">
                          <p><strong>Signature:</strong></p>
                          <div className="signature-details">
                            <p><strong>r:</strong></p>
                            <div className="full-hash">{transaction.input.signature.r}</div>
                            <p><strong>s:</strong></p>
                            <div className="full-hash">{transaction.input.signature.s}</div>
                            <p><strong>Recovery Param:</strong> {transaction.input.signature.recoveryParam}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="outputs">
                      <p><strong>Output Map:</strong></p>
                      {Object.entries(transaction.outputMap).map(([address, amount]) => (
                        <div key={address} className="output-item">
                          <p><strong>Address:</strong></p>
                          <div className="full-hash">{address}</div>
                          <p><strong>Amount:</strong> {amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlockchainData