const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
var uploadRouter = express.Router();
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

const upload = multer({storage:storage,fileFilter:imageFileFilter});
/*uploadRouter.use(bodyParser.json());
uploadRouter.route('/')
    .get(authenticate.verifyUser,function(req, res, next) 
    {
        res.statusCode = 403;
        res.send('GET Operation is ot valid on multiple instances');
    })
    .post(upload.single('imageFile'),function(req, res, next) 
    {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(req.file);
    })
    .put(authenticate.verifyUser,function(req, res, next) 
    {
        res.statusCode = 403;
        res.send('GET Operation is ot valid on multiple instances');
    })
    .delete(authenticate.verifyUser,function(req, res, next) 
    {
        res.statusCode = 403;
        res.send('DELETE Operation is ot valid on multiple instances');
    });*/

module.exports = uploadRouter;
