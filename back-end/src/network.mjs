import PubNub from 'pubnub';

const CHANNELS = {

    TEST: 'TEST',
    BLOCKCHAIN: 'SMARTCHAIN',
    TRANSACTION: 'TRANSACTION'

};


const credentials = {

    publishKey: process.env.PUB_KEY,
    subscribeKey: process.env.SUB_KEY,
    secretKey: process.env.SEC_KEY,
    userId: process.env.USER_ID,

};


export default class Network {

    constructor({ blockchain, transactionPool, wallet }) {

        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;

        this.pubnub = new PubNub ( credentials );
        this.pubnub.subscribe( { channels: Object.values( CHANNELS ) } );
        this.pubnub.addListener ( this.handleMessage () );

    }

    broadcastChain () {

        this.publish({

            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify( this.blockchain.chain )

        });

    }

    broadcastTransaction ( transaction ) {

        this.publish ({

            channel: CHANNELS.TRANSACTION,
            message: JSON.stringify ( this.blockchain.chain ),

        });

    }

    handleMessage ( channel, message ) {

        console.log(`Got message ${message} on channel ${channel}`);

        return {

            message: ( msgObject ) => {

                const { channel, message } = msgObject;
                const msg = JSON.parse ( message );

                switch ( channel ) {

                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain ( msg );
                        break;

                    case CHANNELS.TRANSACTION:
                        if ( !this.transactionPool.transactionExists ( {

                                address: this.wallet.publishKey

                            } )
                        ) { this.transactionPool.addTransaction ( msg ) }
                        break;

                    default:
                        return;

                }

            }

        }

    }

    publish({ channel, message }) {

        this.pubnub.publish ( { channel, message } )

    }

}


