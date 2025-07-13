import PubNub from 'pubnub';

const CHANNELS = {

    TEST: 'TEST',
    BLOCKCHAIN: 'SMARTCHAIN',
    TRANSACTION: 'TRANSACTION',
    NEWBLOCK: 'NEWBLOCK'

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
        this.pubnub.addListener( this.handleMessage() );
        

    }

    broadcastBlock(block) {
    this.publish({

        channel: CHANNELS.NEWBLOCK,
        message: JSON.stringify([block])

    });
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
            message: JSON.stringify ( transaction ),

        });

    }

    handleMessage() {

    console.log('✅ PubNub message handler is up and running!');

    return {
        
    message: ( msgObject ) => {

        const { channel, message } = msgObject;

        const msg = JSON.parse(message);

        console.log(
          `Meddelande har mottagits på kanal: ${channel}, meddelandet är ${message}`
        );

        switch (channel) {

          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(msg, () => {

              this.transactionPool.clearBlockTransactions({ chain: msg });

            });
            break;

            case CHANNELS.NEWBLOCK:
            console.log('📦 Received new block:', msg[0].hash);
            this.blockchain.chain.push(msg[0]);
            this.transactionPool.clearBlockTransactions({ chain: msg });
            break; 

          case CHANNELS.TRANSACTION:
            if (
              !this.transactionPool.transactionExists({
                address: this.wallet.publicKey,
              })
            ) {

              this.transactionPool.addTransaction(msg);
              
            }
            break;
          default:
            return;
        }
      },
    };
  }

    publish({ channel, message }) {

        this.pubnub.publish ( { channel, message } )

    }

}


