import mongoose, { ConnectOptions } from 'mongoose';

export const dbConection = async() => {

  const mongoDB_CNN = process.env.MONGODB_CNN || '';

  const options: ConnectOptions = { };

  try{

    await mongoose.connect(mongoDB_CNN, options);
    console.log('**** DB ONLINE **** ');

  }catch(error){

    console.log(error);
    throw new Error('Database error conection');

  }

}