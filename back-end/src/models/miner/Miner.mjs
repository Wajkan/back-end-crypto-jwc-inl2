import Transaction from "../wallet/Transaction.mjs";
import Wallet from "../wallet/Wallet.mjs";

export default class Miner {

    constructor ( { transactionPool, wallet, blockchain, server } ) {

        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.blockchain = blockchain;
        this.server = server;

    };

    async mineTransactions() {

        let validTransactions = [];

        validTransactions = this.transactionPool.validateTransactions();

        validTransactions.push( Transaction.transactionReward( { miner: this.wallet } ) );

        await this.blockchain.addBlock({ data: validTransactions });

        this.server.broadcastChain();

        this.transactionPool.clearTransactions();

        this.wallet.balance = Wallet.calculateBalance({
        
            chain: this.blockchain.chain,
            address: this.wallet.publicKey
        
        });

        return validTransactions;

    }

};