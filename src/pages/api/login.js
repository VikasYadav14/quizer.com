import userModel from '@/models/user';
import connectDB from '@/middleware/mongodb';
import jwt from 'jsonwebtoken';

const login = async function (req, res) {
  try {
    let data = req.body;
    let { email, password } = data;

    const checkData = await userModel.findOne({ email, password });
    if (!checkData) {
      return res.status(404).send({
        status: false,
        error: 'Credentials are Incorrect, Try Again',
      });
    }
    const token = jwt.sign(
      {
        userId: checkData._id,
        email,
      },
      process.env.JWT_SecretKey,
      { expiresIn: '1d' }
    );
    return res.status(200).send({status:true, token,fname:checkData.fname, message:"Successfully Login" });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

export default connectDB(login);
