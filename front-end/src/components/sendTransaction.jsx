import { useState } from 'react'

function SendTransaction() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: ''
  })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSendTransaction = async (e) => {
    e.preventDefault()
    
    if (!formData.recipient || !formData.amount) {
      alert('Please fill in all fields')
      return
    }

    try {
      setSending(true)
      
      // Replace with your actual endpoint
      // const response = await fetch('/api/send-transaction', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     recipient: formData.recipient,
      //     amount: parseFloat(formData.amount)
      //   })
      // })
      
      console.log('Sending transaction:', {
        recipient: formData.recipient,
        amount: parseFloat(formData.amount)
      })
      
      // Mock success
      alert('Transaction sent successfully!')
      setFormData({ recipient: '', amount: '' })
      
    } catch (error) {
      console.error('Error sending transaction:', error)
      alert('Failed to send transaction')
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
            placeholder="Enter recipient address"
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
    </div>
  )
}

export default SendTransaction