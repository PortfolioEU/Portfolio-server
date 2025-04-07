const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Contact = require('../models/Contact.model')

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
    }).catch( (e) => {
        console.log('error trying to contact', e)
        res.status(500).json({message: 'error trying to contact'})
    });
});


module.exports = router;