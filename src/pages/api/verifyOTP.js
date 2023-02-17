import userModel from '@/models/user';
import connectDB from '@/middleware/mongodb';

async function verifyOTP(req, res) {
  try {
    const { email, otp, newPassword } = req.body;
    const userData = await userModel.findOne({ email, otp });
    if (!userData) return res.status(500).send({status:false, error: 'OTP is Wrong' });
    const { exTime } = userData;
    if (exTime < Date.now())
      return res
        .status(400)
        .send({ status: false, error: 'OTP Expired' });
    await userModel.updateOne(
      { email },
      {
        $set: { password:newPassword },
        $unset: { otp, exTime },
      }
    );
    return res
      .status(200)
      .send({ status: true, message: 'Password Succesfully Reset' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default connectDB(verifyOTP);
