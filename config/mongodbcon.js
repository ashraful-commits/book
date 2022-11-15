import mongoose from 'mongoose';
import colors from 'colors';

//============================ create a connoction

export const MongoDBcon = () => {
  try {
    const connection = mongoose.connect(process.env.MONGODB_CON);
    console.log(`MongoDB connection is Successfully`.bgCyan);
  } catch (error) {
    console.log(error.message);
  }
};
