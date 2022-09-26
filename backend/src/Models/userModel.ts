import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface typeUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
interface typeUserDocument extends typeUser, Document {
  matchPassword: (enterPassword: string) => Promise<boolean>;
}

const userSchema: Schema<typeUserDocument> = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    isAdmin: {
      type: 'boolean',
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};
userSchema.pre('save', async function (next: any) {
  //*Only run is password is modified
  if (!this.isModified('password')) {
    return next();
  }
  //*encript the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
