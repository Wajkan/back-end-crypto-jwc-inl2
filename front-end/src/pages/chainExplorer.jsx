import WalletInfo from '../components/walletInfo'
import SendTransaction from '../components/sendTransaction'
import MineTransactions from '../components/mineTransactions'
import BlockchainData from '../components/blockchainData'
import TransactionPool from '../components/transactionPool'

function ChainExplorer({ onLogout }) {
  return (
    <div className="chain-explorer">
      <div className="explorer-header">
        <h1>Blockchain Explorer</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="explorer-grid">
        <WalletInfo />
        <SendTransaction />
        <TransactionPool />
        <MineTransactions />
        <BlockchainData />
      </div>
    </div>
  )
}

export default ChainExplorer