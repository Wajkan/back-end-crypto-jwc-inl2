import Block from "./Block.mjs";
import BlockService from "../../services/block-services.mjs";
import { createHash } from "../../utilities/hash.mjs";
import { REWARD_ADDRESS } from "../../utilities/config.mjs";



export default class Blockchain {

    constructor(){

        this.chain = [Block.genesis()];
        this.blockService = new BlockService();
        this.initializeFromDataBase();

    };

    async addBlock ({ data }) {

        const addedBlock = Block.mineBlock({

            previousBlock: this.chain.at(-1),
            data,

        });

        this.chain.push(addedBlock);

        try {
            
            await this.blockService.saveBlockToDatabase(addedBlock, this.chain.length - 1);
            console.log('Block saved to database');
            

        } catch (error) {
            
            console.error('Error saving block to database:', error.message);

        }

    };

    async replaceChain ( chain, callback ) {

        if ( chain.length <= this.chain.length ) {

            return;

        }

        if ( !Blockchain.isValid(chain) ) {

            return;

        }

        if ( callback ) callback();

        this.chain = chain;

        try {

            await this.blockService.syncChainWithDatabase(chain);
            console.log('Chain synced with database');
            
        } catch (error) {

            console.error('Error syncing chain with database:', error.message);
            
        }

    };

    validateTransactionData({ chain }) {

        for ( let i = 1; i < chain.length; i++ ) {

            const block = chain[i];

            let rewardCount = 0;

            for ( let transaction of block.data ) {

                if ( transaction.input.address === REWARD_ADDRESS.address ) {

                    rewardCount += 1;

                    if ( rewardCount > 1 ) {

                        console.error('Too much crypto for you buddy');

                        return false;

                    }
                }
            }
        }
        return true;
    };


async initializeFromDataBase() {
    try {
        console.log('🔄 Initializing blockchain from database...');
        const loadSavedChain = await this.blockService.loadChainFromDatabase();

        if (loadSavedChain && loadSavedChain.length > 0) {
            console.log('📦 Found existing chain in database');
            
            if (Blockchain.isValid(loadSavedChain)) {
                this.chain = loadSavedChain;
                console.log(`✅ Successfully loaded: ${loadSavedChain.length} blocks from database`);
                console.log(`📊 Latest block hash: ${this.chain[this.chain.length - 1].hash}`);
            } else {
                console.log('❌ Invalid chain in database, lets start fresh!');
            }

        } else {
            console.log('📦 No chain found, booting with genesis only');
            
            try {

                const genesisBlock = Block.genesis();
                
                const savedGenesis = await this.blockService.saveBlockToDatabase(genesisBlock, 0);
                console.log('✅ Genesis block saved to database:', savedGenesis._id);
                
            } catch (saveError) {

                console.error('❌ Failed to save genesis block:', saveError.message);

            }
        }

    } catch (error) {

        console.error('❌ Could not initialize chain from database:', error.message);
        console.log('📦 Starting with in-memory genesis block only');
        
    }
}

    static isValid ( chain ) {

        if ( JSON.stringify(chain.at(0)) !== JSON.stringify(Block.genesis()) ) {

            return false;

        }

        for ( let i = 1; i < chain.length; i++ ) {

            const { timestamp, data, hash, lastHash, nonce, difficulty, blockIndex } = chain.at(i);

            const prevHash = chain [ i - 1 ].hash;

            if ( lastHash !== prevHash ) return false;

            const validHash = createHash( timestamp, data, lastHash, nonce, difficulty, blockIndex );

            if ( hash !== validHash ) return false;

        }

        return true;

    };


};