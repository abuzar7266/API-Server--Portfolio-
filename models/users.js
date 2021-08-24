var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
        default: 'Anonymous'
    },
    lastname: {
        type: String,
        default: 'User'
    },
    username:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);