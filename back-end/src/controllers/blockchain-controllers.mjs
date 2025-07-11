import { blockchain } from "../server.mjs";
import { server } from "../server.mjs";
import AppError from "../models/global/appError.mjs";
import { catchErrorAsync } from "../utilities/catchErrorAsync.mjs";

export const listAllBlocks = ( req, res, next ) => {

    try {

        if (!blockchain.chain || blockchain.chain.length === 0) {

            return next(new AppError('No blocks found!', 404));

        }

        res.status( 200 )
        .json( { success: true, data: blockchain.chain } );


    } catch (error) {

        next(error);

    }

}

export const addBlock = catchErrorAsync (async ( req, res, next ) => {

    const { data } = req.body;

    if (!data) {

        return next (new AppError('Data is required', 400));

    }

    await blockchain.addBlock( { data } );

    server.broadcastChain();

    res.status( 201 )
    .json( { success: true, message: 'Block is added', data: blockchain.chain.at(-1) } )

});