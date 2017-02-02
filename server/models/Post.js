// schema.js

var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var postSchema = mongoose.Schema({
	title: String,
	user: Number,
	location: String,
	image: String,
  price: String,
	rating: Number,
	voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voter' }],
	vote_count: Number
},
{
  timestamps: true
});

postSchema.plugin(findOrCreate);

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
