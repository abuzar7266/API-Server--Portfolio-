var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Name:
    {
        type:String,
        required:true
    },
    FieldOfStudy:{
        type:String,
        required:true
    },
    TimeTaken:{
        type:String,
        required:true
    },
    Collaborative:{
        type:Boolean,
        required:true
    },
    ProjectTextLine:{
        type:String,
        required:true,
        minlength:10,
        maxlength:30
    },
    ProjectImages:[String]
});

module.exports = mongoose.model('project', Project);