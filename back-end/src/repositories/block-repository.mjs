import BlockModel from '../models/schemas/blockModel.mjs';

export default class BlockRepository {

    async saveBlock( blockData ) {

        try {

            const block = new BlockModel(blockData);
            return await block.save();
            
        } catch (error) {

            throw new Error(`Error saving block: ${error.message}`); 
            
        }

    };

    async getAllBlocks() {

        try {
            
            return await BlockModel.find().sort({ blockIndex: 1 });

        } catch (error) {
            
             throw new Error(`Error retrieving blocks: ${error.message}`);

        }

    }

    async getBlockByHash( hash ) {

        try {
            
            return await BlockModel.findOne({ hash });

        } catch (error) {
            
            throw new Error(`Error finding block: ${error.message}`);

        }

    };

    async deleteAllBlocks() {

        try {
            
            return await BlockModel.deleteMany({});

        } catch (error) {
            
             throw new Error(`Error deleting blocks: ${error.message}`);

        }

    };

}



