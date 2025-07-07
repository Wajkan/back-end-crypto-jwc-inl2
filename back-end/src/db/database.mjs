import mongoose from 'mongoose';

export const connectDatabase = async () => {

    try {
       
        const conn = await mongoose.connect( process.env.MONGODB_URI );
        
        if ( conn ) {

            console.log(`MongoDB Connected: ${conn.connection.host}`);

        }

    } catch (error) {

        console.error('Database connection error:', error);
        
    }

};