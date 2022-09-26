import mongoose from 'mongoose';

interface UserType {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default UserType;
