import BlockRepository from "../repositories/block-repository.mjs";

export default class BlockService {

    constructor() {

        this.blockRepository = new BlockRepository();

    }

    async saveBlockToDatabase ( block, blockIndex ) {

        try {
            
            const blockData = {

                timestamp: block.timestamp,
                hash: block.hash,
                lastHash: block.lastHash,
                data: block.data,
                nonce: block.nonce,
                difficulty: block.difficulty,
                blockIndex: blockIndex

            }

            return await this.blockRepository.saveBlock(blockData);

        } catch (error) {

            throw new Error(`BlockService: ${error.message}`);
            
        }

    }

    async getAllBlocks() {

        try {

            return await this.blockRepository.getAllBlocks();

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