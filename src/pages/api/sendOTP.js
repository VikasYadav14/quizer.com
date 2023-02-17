import userModel from "@/models/user";
import connectDB from "@/middleware/mongodb";

async function sendOTP(req,res) {
    try {
        const { email } = req.body;
        const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).send({status:false, error: `user not found at ${email}` });
        const mailOptions = {
            from: 'vikas14nov2001@gmail.com',
            to: email,
            subject: 'Your One Time Password',
            html: `<p>Enter <b>${otp}</b> in the app to reset Password</p>
            <p>This code <b>expires in 1 hour</b></p>`,
        };
        transporter.sendMail(mailOptions, (error, done) => {
            if (error) return res.status(500).send({status:false,error:error.message});
            else return done;
        });
        const obj = {};
        obj.otp = otp;
        obj.exTime = Date.now() + 3600000;
        await userModel.updateOne({ email }, obj);
        return res.status(200).send({status:true,message:'OTP successfully send to your register Email'});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export default connectDB(sendOTP)

import Nodemailer from 'nodemailer'

const transporter = Nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});