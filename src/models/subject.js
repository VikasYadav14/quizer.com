import mongoose from 'mongoose';
const subjectModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.models = {}
export default mongoose.model('subject', subjectModel);
