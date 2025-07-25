import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({

    timestamp: {

        type: Number,
        required: true

    },

    hash: {

        type: String,
        required: true,
        unique: true

    },

    lastHash: {

        type: String,
        required: true

    },

    data: {

        type: String,
        required: true

    },

    nonce: {

        type: Number,
        required: true

    },

    difficulty: {

        type: Number,
        required: true

    },

   blockIndex: {

        type: Number,
        required: true

    }

}, {  
    collection: 'blocks'
});

export default mongoose.model('Block', blockSchema);