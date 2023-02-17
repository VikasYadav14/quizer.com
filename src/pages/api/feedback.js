import feedbackModel from '@/models/feedback';
import connectDB from '@/middleware/mongodb';

export default connectDB(async (req, res) => {
    try {
        await feedbackModel.create(req.body);
        return res.status(201).send({
          status: true,
          message: 'Thankyou for your precious feedback',
        });
      } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
      }
    });
