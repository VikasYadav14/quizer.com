import userModel from '@/models/user';
import connectDB from '@/middleware/mongodb';

export default connectDB(async (req, res) => {
    try {
        let data = req.body;
    
        let { email } = data;
    
        let checkEmail = await userModel.findOne({ email: email });
        if (checkEmail) {
          return res
            .status(400)
            .send({ status: false, error: 'Email id is already registered' });
        }
    
        const createUser = await userModel.create(data);
        return res.status(201).send({
          status: true,
          message: 'Registered successfully',
        });
      } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
      }
    });
