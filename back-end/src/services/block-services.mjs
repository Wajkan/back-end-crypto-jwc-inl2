import BlockRepository from "../repositories/block-repository.mjs";

export default class BlockService {

    constructor() {

        this.blockRepository = new BlockRepository();

    }

    
    async getAllBlocks() {

        try {

            return await this.blockRepository.getAllBlocks();

        } catch (error) {
            
            throw new Error(`BlockService: ${error.message}`);

        }

    }

    async loadChainFromDatabase() {

        try {
            
            const blocks = await this.blockRepository.getAllBlocks();

            if ( blocks.length === 0 ) {

                console.log('No blocks, booting with genisis only');
                return null;

            }

            console.log(`Chain loaded from database, number of blocks: ${blocks.length}`);

            return blocks.map(block =>({

                timestamp: block.timestamp,
                hash: block.hash,
                lastHash: block.lastHash,
                data: JSON.parse(block.data),
                nonce: block.nonce,
                difficulty: block.difficulty,
                blockIndex: block.blockIndex

            }));

        } catch (error) {
            
            console.error('Could not load chain from database:', error.message);
            return null

        }

    }

    async saveBlockToDatabase ( block, blockIndex ) {

        try {
            
            const blockData = {

                timestamp: block.timestamp,
                hash: block.hash,
                lastHash: block.lastHash,
                data: JSON.stringify(block.data),
                nonce: block.nonce,
                difficulty: block.difficulty,
                blockIndex: blockIndex

            }

            return await this.blockRepository.saveBlock(blockData);

        } catch (error) {

            throw new Error(`BlockService: ${error.message}`);
            
        }

    }


    async syncChainWithDatabase ( chain ) {

        try {
            
            await this.blockRepository.deleteAllBlocks();

            for ( let i = 0; i < chain.length; i++ ) {

                await this.saveBlockToDatabase(chain[i], i);
                    
            }

            return true;
        } catch (error) {

            throw new Error(`BlockService: ${error.message}`);
            
        }

    }

}