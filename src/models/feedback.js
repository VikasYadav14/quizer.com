import mongoose from 'mongoose';
const feedbackModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    message:{
        type:String
    }
  },
  { timestamps: true }
);
mongoose.models = {}
export default mongoose.model('feedback', feedbackModel);
