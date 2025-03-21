const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Project = require('../models/Project.model')

//Create a project
router.post('/', (req, res, net) => {
    const {
        projectName,
        projectImage,
        projectDescription,
        projectLink,
        projectRepo
    } = req.body;

    Project.create({
        projectName,
        projectImage,
        projectDescription,
        projectLink,
        projectRepo,
    })
    .then( (projectsFromDB) => {
        res.status(201).json(projectsFromDB)
    })
    .catch( (e) => {
        res.status(500).json({message: 'Error creating project'})
    })
})

//Retrieve all projects
router.get('/', (req, res, next) => {
    Project.find()
    .then( (projectsFromDB) => {
        res.status(200).json(projectsFromDB);
    })
    .catch( (e) =>{
        res.json({message: 'Error Fetching Projects'})
    })
});
//Retrieve a specific project
router.get('/:projectId', (req, res, next) => {
    const { projectId } = req.params;

     //check if the project exist
     if(!mongoose.Types.ObjectId.isValid(projectId)){
        res.status(400).json({message: 'Project with specified id is not valid'})
    }

    Project.findById(projectId)
    .then( (projectsFromDB) => {
        res.status(200).json(projectsFromDB)
    })
    .catch( (e) => {
        res.status(500).json({message: 'Error retrieving the wine'})
    })
});

//Update a specific project
router.put('/:projectId', (req, res, next) => {
    const { projectId } = req.params;

     //check if the project exist
     if(!mongoose.Types.ObjectId.isValid(projectId)){
        res.status(400).json({message: 'Project with specified id is not valid'})
    }

    Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then( (projectsFromDB) => {
        res.status(200).json(projectsFromDB)
    })
    .catch( (e) => {
        res.status(500).json({message: 'Error updating the project'})
    })
})

//Delete a specific project
router.delete('/:projectId', (req, res, next) => {
    const {projectId} = req.params;

    //check if the project exist
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        res.status(400).json({message: 'Project with specified id is not valid'})
    }

    Project.findByIdAndDelete(projectId)
    .then( () => {
        res.json({message: `project with ${projectId} deleted successfully!`})
    })
    .catch( (e) => {
        res.status(500).json({message: 'Error deleting the project'})
    })
})

module.exports = router