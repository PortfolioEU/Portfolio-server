const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')

const Contact = require('../models/Contact.model')

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

//create a contact form
router.post('/contact', (req, res, next) => {
    const { fullname, email, message } = req.body;

    Contact.create({
        fullname,
        email,
        message
    })
    .then( (contactDB) => {
        res.status(201).json(contactDB)
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: 'samuelonoja2@gmail.com',
            subject: 'New Contact Form Portfolio', 
            text: `You have a new message from ${fullname} (${email}):\n\n${message}`,
          };
          // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Email sent:', info.response);
        res.status(201).json(contactDB);
      });

    }).catch( (e) => {
        console.log('error trying to contact', e)
        res.status(500).json({message: 'error trying to contact'})
    });
});


module.exports = router;