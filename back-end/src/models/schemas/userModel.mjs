import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator'

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
        required: [true, 'Must have valid email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,'Invalid email, please read carefully what you wrote']

    },

    password: {

        type: String,
        required: [true, 'Must enter a valid password'],
        minlength: 8,
        select: false

    }

}, {  
    collection: 'users'
});

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12)
    next();

})

userSchema.methods.comparePassword = async function (passwordToCompare, userPassword) {

    return await bcrypt.compare(passwordToCompare, userPassword);

}

export default mongoose.model('User', userSchema);