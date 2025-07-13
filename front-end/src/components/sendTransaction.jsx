import { useState } from 'react'

function SendTransaction() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: ''
  })
  const [sending, setSending] = useState(false)
  const [lastTransaction, setLastTransaction] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSendTransaction = async (e) => {
    e.preventDefault()
    
    if (!formData.recipient || !formData.amount) {
      setError('Please fill in all fields')
      return
    }

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than 0')
      return
    }

    try {
      setSending(true)
      setError(null)
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken')
      
      if (!token) {
        setError('No authentication token found')
        return
      }
      
      const response = await fetch('http://localhost:3000/api/v1/wallet/transactions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient: formData.recipient,
          amount: formData.amount
        })
      })
      
      const data = await response.json()
      console.log('Transaction response:', data)
      
      if (data.success) {
        // Successful transaction
        setLastTransaction({
          id: data.data.id,
          recipient: formData.recipient,
          amount: formData.amount,
          timestamp: new Date(data.data.input.timestamp).toISOString(),
          senderAddress: data.data.input.address,
          senderBalance: data.data.outputMap[data.data.input.address] || 0,
          signature: data.data.input.signature
        })
        
        // Reset form
        setFormData({ recipient: '', amount: '' })
        
        console.log('Transaction sent successfully:', data.data)
        
      } else {
        // Handle different types of failures
        if (data.statusCode === 400 && data.error === "Not enough funds!") {
          setError(`💰 Insufficient funds! You tried to send ${formData.amount} but don't have enough balance.`)
        } else {
          setError(data.error || data.message || 'Transaction failed')
        }
      }
      
    } catch (error) {
      console.error('Error sending transaction:', error)
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Cannot connect to server. Is your backend running?')
      } else {
        setError(`Network error: ${error.message}`)
      }
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="component-card">
      <h3>Send Transaction</h3>
      <form onSubmit={handleSendTransaction}>
        <div className="form-group">
          <label>Recipient Address:</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="Enter recipient address or name"
            required
          />
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button type="submit" disabled={sending}>
          {sending ? 'Sending...' : 'Send Transaction'}
        </button>
      </form>
      
      {error && (
        <div className={`transaction-error ${error.includes('Insufficient funds') ? 'insufficient-funds' : ''}`}>
          <p>⚠️ {error}</p>
          {error.includes('Insufficient funds') && (
            <p><small>Check your wallet balance and try a smaller amount</small></p>
          )}
        </div>
      )}
      
      {lastTransaction && (
        <div className="transaction-success">
          <h4>✅ Transaction Sent Successfully!</h4>
          
          <div className="transaction-details">
            <p><strong>Transaction ID:</strong></p>
            <div className="full-hash">{lastTransaction.id}</div>
            
            <p><strong>Recipient:</strong> {lastTransaction.recipient}</p>
            <p><strong>Amount:</strong> {lastTransaction.amount}</p>
            <p><strong>Sent at:</strong> {new Date(lastTransaction.timestamp).toLocaleString()}</p>
            
            <p><strong>Your Address:</strong></p>
            <div className="full-hash">{lastTransaction.senderAddress}</div>
            
            <p><strong>Your Remaining Balance:</strong> {lastTransaction.senderBalance}</p>
            
            <div className="signature-section">
              <p><strong>Digital Signature:</strong></p>
              <div className="signature-details">
                <p><strong>r:</strong></p>
                <div className="full-hash">{lastTransaction.signature.r}</div>
                <p><strong>s:</strong></p>
                <div className="full-hash">{lastTransaction.signature.s}</div>
                <p><strong>Recovery Param:</strong> {lastTransaction.signature.recoveryParam}</p>
              </div>
            </div>
          </div>
          
          <p className="transaction-note">
            <em>Transaction is pending until the next block is mined</em>
          </p>
        </div>
      )}
    </div>
  )
}

export default SendTransaction
