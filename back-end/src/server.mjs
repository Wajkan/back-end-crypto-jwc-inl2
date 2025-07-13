import { app } from "./app.mjs";
import { connectDatabase } from "./db/database.mjs";

import Blockchain from "./models/blockchain/Blockchain.mjs";
import TransactionPool from "./models/wallet/TransactionPool.mjs";
import Wallet from "./models/wallet/Wallet.mjs";

import networkServer from "./network.mjs";

import blockchainRoutes from './routes/blockchain-routes.mjs';
import transactionRoutes from './routes/transaction-routes.mjs';
import userRoutes from './routes/user-routes.mjs';
import authRouter from './routes/auth-routes.mjs';

import AppError from "./models/global/appError.mjs";
import errorHandler from "./middleware/errorHandler.mjs";


await connectDatabase();

export const blockchain = new Blockchain();
await new Promise(resolve => setTimeout(resolve, 2000));

export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const server = new networkServer({

    blockchain,
    transactionPool,
    wallet

});


const DEFAULT_PORT = 3000;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;
let NODE_PORT;


app.use ( '/api/v1/blocks', blockchainRoutes );

app.use ( '/api/v1/wallet', transactionRoutes );

app.use ( '/api/v1/users', userRoutes );

app.use ('/api/v1/auth', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const synchronize = async () => {

    let response = await fetch (`${ROOT_NODE}/api/v1/blocks`);

    if (response) {

        const result = await response.json();

        blockchain.replaceChain( result.data );

    };

    response = await fetch(`${ROOT_NODE}/api/v1/wallet/transactions`);

    if (response) {

        const result = await response.json();

        transactionPool.replaceMap( result.data );

    };

};

if (process.env.GENERATE_NODE_PORT === 'true') {

    NODE_PORT = DEFAULT_PORT + Math.ceil( Math.random() * 1000 );

};

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, ()=>{

    console.log(`Server is running! address: ${PORT} mode: ${process.env.NODE_ENV}`);

    if ( PORT !== DEFAULT_PORT ) {

        synchronize();

    };

});