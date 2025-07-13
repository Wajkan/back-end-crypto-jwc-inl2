import { useState, useEffect } from 'react'

function TransactionPool() {
  const [transactionPool, setTransactionPool] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTransactionPool = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setError('No authentication token found')
        return
      }
      
      const response = await fetch('http://localhost:3000/api/v1/wallet/transactions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      const data = await response.json()
      
      if (data.success && data.data) {
        // Convert object to array of transactions
        const transactions = Object.values(data.data)
        setTransactionPool(transactions)
      } else {
        setTransactionPool([])
      }
      
    } catch (error) {
      console.error('Error fetching transaction pool:', error)
      setTransactionPool([])
      setError('Network error: Could not fetch transaction pool')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactionPool()
  }, [])

  if (loading) return <div className="component-card">Loading transaction pool...</div>

  return (
    <div className="component-card">
      <h3>Transaction Pool</h3>
      <button onClick={fetchTransactionPool} className="refresh-btn">
        Refresh Pool
      </button>
      
      {error && (
        <div className="pool-error">
          <p>⚠️ {error}</p>
        </div>
      )}
      
      {!error && (
        <div className="pool-content">
          <p><strong>Pending Transactions: {transactionPool.length}</strong></p>
          {transactionPool.length === 0 ? (
            <p className="empty-pool">No transactions in pool - nothing to mine</p>
          ) : (
            <div className="pool-transactions">
              {transactionPool.map((transaction, index) => (
                <div key={transaction.id || index} className="pool-transaction">
                  <p><strong>Transaction #{index + 1}</strong></p>
                  
                  <p><strong>ID:</strong></p>
                  <div className="full-hash">{transaction.id}</div>
                  
                  <p><strong>Input:</strong></p>
                  <pre className="json-display">{JSON.stringify(transaction.input, null, 2)}</pre>
                  
                  <p><strong>Output Map:</strong></p>
                  <pre className="json-display">{JSON.stringify(transaction.outputMap, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TransactionPool

