const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PW
    }
});

router.post('/', async (req, res) => {
    const { userEmail, emailBody} = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "Weekly Meal Plan",
        text: emailBody
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
});

module.exports = router;