var express = require('express');
var projectRouter = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/projects');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');

projectRouter.use(bodyParser.json());
projectRouter.route('/')
.get(authenticate.verifyUser,function(req, res, next) 
{
    Project.find({})
    .populate('user')
    .then((details) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(details);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,function(req, res, next) 
{
    var NewData = new Project({user:req.user._id,Name:req.body.Name,FieldOfStudy:req.body.FieldOfStudy,
    TimeTaken:req.body.TimeTaken,Collaborative:req.body.Collaborative,ProjectTextLine:req.body.ProjectTextLine
    ,ProjectImages:req.body.ProjectImages});
    NewData.save()
    .then((details)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(details);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser,function(req, res, next) 
{
    res.statusCode = 403;
    res.send('PUT Operation is ot valid on multiple instances');
})
.delete(authenticate.verifyUser,function(req, res, next) 
{
    Project.deleteMany({})
    .then(()=>{
      res.statusCode = 200;
      res.send('All data has been deleted successfully');
    }, (err) => next(err))
    .catch((err) => next(err));
});


projectRouter.route('/:id')
.get(authenticate.verifyUser,function(req, res, next) 
{
    Project.findById(req.params.id)
    .then((details)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(details);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,function(req, res, next) 
{
    res.statusCode = 403;
    res.send('POST Operation is not valid on single instance');
})
.put(authenticate.verifyUser,function(req, res, next) 
{
    Project.findByIdAndUpdate(req.params.id,req.body)
    .then((details)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(details);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser,function(req, res, next) 
{
    Project.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.statusCode = 200;
      res.send('Project has been removed');
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports = projectRouter;
