import { Console } from 'console';
import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const con = mongoose.connect(process.env.MONGOOSE_URL || '');
    console.log(`Connected to Mongodb succesfullt`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
