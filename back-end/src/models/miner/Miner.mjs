import Transaction from "../wallet/Transaction.mjs";

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

        this.server.broadcastBlock(this.blockchain.chain.at(-1));

        this.transactionPool.clearTransactions();

        return validTransactions;

    }

};