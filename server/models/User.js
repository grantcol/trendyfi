// schema.js

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = mongoose.Schema({
	username: String,
	password: String, 
	name: String,
	image: String,
  gender: String,
  age: Number
},
{
	timestamps: true
});

userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);
module.exports = User;
