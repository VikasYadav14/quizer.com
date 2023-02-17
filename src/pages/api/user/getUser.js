import userModel from '@/models/user';
import connectDB from '@/middleware/mongodb';

export default connectDB(async (req, res) => {
  try {
    const user = await userModel.find();
    if (!user.length) {
      return res.status(404).send({
        status: false,
        error: 'No data Found',
      });
    }
    return res.status(200).send({status:true,user});
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});
