import { transactionPool, wallet, server, blockchain } from "../server.mjs";
import Miner from "../models/miner/Miner.mjs";
import Wallet from "../models/wallet/Wallet.mjs";
import AppError from "../models/global/appError.mjs";
import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";

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

        return res.status( 400 )
        .json ({ success: false, statusCode: 400, error: error.message });

    }

    transactionPool.addTransaction( transaction );
    server.broadcastTransaction( transaction );

    res.status( 201 )
    .json({ success: true, statusCode: 201, data: transaction });

};

export const getWalletInfo = ( req, res, next ) => {

    try {

        const address = wallet.publicKey;

        const balance = Wallet.calculateBalance({

        chain: blockchain.chain,
        address: address

         });

         res.status( 200 )
        .json({success: true, statusCode: 200, data: { address: address, balance: balance }});
        
    } catch (error) {

        next(error);

    }



}

export const listAllTransactions = ( req, res, next ) => {

    try {

        res.status( 200 )
        .json({success: true, statusCode: 200, data: transactionPool.transactionMap});
        
    } catch (error) {
        
        next(error);

    }

}

export const mineTransactions = catchErrorAsync (async ( req, res, next ) => {

    const validTransactions = transactionPool.validateTransactions();

    if (validTransactions.length === 0) {

        return next(new AppError('No transactions to mine', 400));

    }

    const miner = new Miner({

        transactionPool: transactionPool,
        wallet: wallet,
        blockchain: blockchain,
        server: server

    });

    await miner.mineTransactions();


    res.status( 200 )
    .json({success: true, statusCode: 200, message: 'You mined a block!', data: {

        message: 'Congratulations, you succesfully mined a block!',
        blockHash: blockchain.chain.at(-1).hash

    }})
});