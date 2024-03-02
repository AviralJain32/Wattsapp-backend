import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection=async()=>{
    const URL=process.env.MONGO_DB_URL;
    try{
        await mongoose.connect(URL);
        console.log("db connected successfully");
    }
    catch(e){
        console.log(e);
    }
}

export default Connection;