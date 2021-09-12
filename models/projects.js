var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:
    {
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true
    },
    TimeTaken:{
        type:String,
        required:true
    },
    Text:{
        type:String,
        required:true,
        minlength:50
    },
    imageFile:{
        type:String
    },
    files:[{
        type:String
    }]
});
module.exports = mongoose.model('project', Project);