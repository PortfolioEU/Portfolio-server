const {Schema, model} = require('mongoose');

const projectSchema = new Schema({

    projectName: {
        type: String,
        required: true
    },

    projectImage: {
        type: String,
        required: true
    },

    projectDescription: {
        type: String,
        required: true
    },

    projectLink: {
        type: String,
    },

    projectRepo: {
        type: String,
        required: true
    }

})

const Project = model('Project', projectSchema)
module.exports = Project;