const {Schema, model} = require('mongoose')

const contactSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    message: {
        type: String,
        required: true 
    }
})

const Contact = model('Contact', contactSchema)
module.exports = Contact; 