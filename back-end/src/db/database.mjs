import mongoose from 'mongoose';
import AppError from '../models/global/appError.mjs';

export const connectDatabase = async () => {

    try {
       
        const conn = await mongoose.connect( process.env.MONGODB_URI );
        
        if ( conn ) {

            console.log(`MongoDB Connected: ${conn.connection.host}`);

        }

    } catch (error) {

        throw new AppError(error.message, 500);
        
    }

};