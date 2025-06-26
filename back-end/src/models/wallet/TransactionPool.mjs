export default class TransactionPool {

    constructor() {

        this.transactionMap = {};

    }

    addTransaction ( transaction ) {

        this.transactionMap[ transaction.id ] = transaction;

    } 

    replaceMap () {

        this.transactionMap = transactionMap;

    }

    transactionExists ({address}) {

        const transaction = Object.values(this.transactionMap);

        return this.transactionExists.find(
        (transaction) => transaction.input.address === address);

    }

}