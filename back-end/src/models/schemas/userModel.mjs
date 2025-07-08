import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName: {

        type: String,
        required: [true, 'First name required']

    },

    lastName: {

        type: String,
        required: [true, 'Lastname required']

    },

    email: {

        type: String,
        required: [true, 'Must have valid email']

    },

    password: {

        type: String,
        required: [true, 'Must enter password']

    }

}, {  
    collection: 'users'
});

export default mongoose.model('User', userSchema);