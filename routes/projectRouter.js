var express = require('express');
var projectRouter = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/projects');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');



const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
});
const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
    {
        return cb(new Error('You can upload only image files!'),false);
    }
    cb(null,true);
};

const upload1 = multer({storage:storage,fileFilter:imageFileFilter});
const upload2 = multer({storage:storage,fileFilter:imageFileFilter});


projectRouter.use(bodyParser.json());
projectRouter.route('/')
.get(function(req, res, next) 
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
.post(authenticate.verifyUser,upload1.any('image','attachments'),function(req, res, next) 
{
    var Data = new Array();
    var image = req.files[0].originalname;
    for(let i=1;i<req.files.length;i++)
    {
        Data[i-1] = req.files[i].originalname;
    }
    var NewData = new Project({user:req.user._id,title:req.body.title,
    Type:req.body.Type,TimeTaken:req.body.TimeTaken,Text:req.body.Text,imageFile:image,files:Data});
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
.get(function(req, res, next) 
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
    //next(req.body.TimeTaken);
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
