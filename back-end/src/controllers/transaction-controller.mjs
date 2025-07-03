import { transactionPool, wallet, server, blockchain } from "../server.mjs";
import Miner from "../models/miner/Miner.mjs";
import Wallet from "../models/wallet/Wallet.mjs";

export const addTransaction = ( req, res ) => {

    const { amount, recipient } = req.body;

    let transaction = transactionPool.transactionExists({

        address: wallet.publicKey,

    });

    try {

        if ( transaction ) {

            transaction.update({

                sender: wallet,
                recipient: recipient,
                amount: amount
                    
            });

        } else {

            transaction = wallet.createTransaction ({ recipient, amount });

        }

    } catch (error) {

        return res
        .status( 400 )
        .json ({ success: true, statusCode: 400, error: error.message });

    }

    transactionPool.addTransaction( transaction );
    server.broadcastTransaction( transaction );

    res.status( 201 )
    .json({ success: true, statusCode: 201, data: transaction });

};

export const getWalletInfo = ( req, res ) => {

    const address = wallet.publicKey;

    const balance = Wallet.calculateBalance({

        chain: blockchain.chain,
        address: address

    });

    res.status( 200 )
    .json({success: true, statusCode: 200, data: { address: address, balance: balance }});

}

export const listAllTransactions = ( req, res ) => {

    res.status( 200 )
    .json({success: true, statusCode: 200, data: transactionPool.transactionMap});

}

export const mineTransactions = ( req, res ) => {

    const miner = new Miner({

        transactionPool: transactionPool,
        wallet: wallet,
        blockchain: blockchain,
        server: server

    });

    miner.mineTransactions();

    res.status( 200 )
    .json({success: true, statusCode: 200, data: 'You mined a block!'});

}