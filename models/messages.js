var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    FullName: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    TextMessage:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('message', Message);