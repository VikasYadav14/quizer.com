import userModel from '@/models/user';
import connectDB from '@/middleware/mongodb';

export default connectDB(async (req, res) => {
  try {
    let data = req.body;

    let { email } = data;

    let user = await userModel.updateOne({ email }, { data }, { new: true });
    return res.status(201).send({
      status: true,
      message: 'Updated successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});
