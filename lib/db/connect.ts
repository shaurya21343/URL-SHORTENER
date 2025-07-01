import mongoose from 'mongoose';

const connect =async()=>{
    try {
        
        const dbUrl:string | undefined = process.env.MONGO_URL;

        if (!dbUrl) {
            throw new Error('MONGO_URL environment variable is not set');
        }
        
        await mongoose.connect(dbUrl, {});
        
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default connect;