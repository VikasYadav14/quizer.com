import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
    },
    otp: {
      type: Number,
    },
    exTime: {
      type: Number,
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model('user', userModel);
