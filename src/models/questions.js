import mongoose from 'mongoose';
const questionModel = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    explaination:{
      type:String
    }
  },
  { timestamps: true }
);

mongoose.models = {};
module.exports = mongoose.model('question', questionModel);
