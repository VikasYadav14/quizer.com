import subjectModel from '@/models/subject';
import connectDB from '@/middleware/mongodb';

export default connectDB(async (req, res) => {
  try {
    const subjects = await subjectModel.find();
    if (!subjects.length) {
      return res.status(404).send({
        status: false,
        error: 'No data Found',
      });
    }
    return res.status(200).send(subjects);
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});
