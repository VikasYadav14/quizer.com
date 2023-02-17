import questionsModel from '@/models/questions';
import connectDB from '@/middleware/mongodb';

const getQuestions = async function (req, res) {
  try {
    let { topic } = req.query;
    topic = topic.split('-').join(' ');
    const questions = await questionsModel.aggregate([
      { $match: { topic } },
      { $sample: { size:10 } }
    ])    
    if (!questions.length) {
      return res.status(404).send({
        status: false,
        error: 'No data Found',
      });
    }
    return res.status(200).send({ status: true, questions });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

export default connectDB(getQuestions);